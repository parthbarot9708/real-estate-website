import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    category: "",
    location: "",
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/properties", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProperties();
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", loginForm);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setLoginForm({ email: "", password: "" });
      console.log("Logged in successfully with token:", token);
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
      alert("Login failed: " + (err.response ? err.response.data.message : err.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission triggered with data:", form);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("location", form.location);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      console.log("Sending POST request to /api/properties/add with token:", token);
      const response = await axios.post("http://localhost:5000/api/properties/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
        timeout: 10000, // Set a 10-second timeout to catch slow responses
      });

      console.log("Server response:", response.data);
      fetchProperties();
      setForm({ title: "", description: "", price: "", image: null, category: "", location: "" });
    } catch (err) {
      console.error("Error in handleSubmit:", err.response ? err.response.data : err.message);
      if (err.code === "ECONNREFUSED") {
        alert("Failed to add property: Server is not responding. Please ensure the backend is running on port 5000.");
      } else {
        alert("Failed to add property: " + (err.response ? err.response.data.message : err.message));
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/properties/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProperties();
    } catch (err) {
      console.error("Error deleting property:", err.response ? err.response.data : err.message);
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleLoginChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Admin - Manage Listings</h2>
      <button onClick={() => { localStorage.removeItem("token"); setIsLoggedIn(false); }}>Logout</button>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input type="file" name="image" onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <button type="submit">Add Property</button>
      </form>

      <h3>Existing Listings</h3>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
            {property.title} - ${property.price}
            <button onClick={() => handleDelete(property._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;