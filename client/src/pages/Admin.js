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
  const [errors, setErrors] = useState({}); // Validation errors

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/properties", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
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

  // **Form Validations**
  const validateLogin = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(loginForm.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!loginForm.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const validatePropertyForm = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.price || form.price <= 0) newErrors.price = "Price must be a positive number";
    if (!form.image) newErrors.image = "Image is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.location) newErrors.location = "Location is required";
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", loginForm);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setLoginForm({ email: "", password: "" });
      setErrors({});
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validatePropertyForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/properties/add", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      fetchProperties();
      setForm({ title: "", description: "", price: "", image: null, category: "", location: "" });
      setErrors({});
    } catch (err) {
      alert("Failed to add property: " + (err.response?.data?.message || err.message));
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
      console.error("Error deleting property:", err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-10 bg-gray-100 h-screen">
        <h2 className="text-3xl font-semibold mb-4 animate__animated animate__fadeIn">Admin Login</h2>
        <form className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg animate__animated animate__fadeIn" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={handleLoginChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleLoginChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container p-8">
      <h2 className="text-3xl font-semibold mb-6 animate__animated animate__fadeIn">Admin - Manage Listings</h2>
      <button
        className="mb-6 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
        onClick={() => { localStorage.removeItem("token"); setIsLoggedIn(false); }}
      >
        Logout
      </button>

      <form className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg mb-8 animate__animated animate__fadeIn" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title}</p>}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description}</p>}

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        {errors.price && <p className="text-red-500 text-sm mb-2">{errors.price}</p>}

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        {errors.image && <p className="text-red-500 text-sm mb-2">{errors.image}</p>}

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        {errors.category && <p className="text-red-500 text-sm mb-2">{errors.category}</p>}

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        {errors.location && <p className="text-red-500 text-sm mb-2">{errors.location}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
        >
          Add Property
        </button>
      </form>

      <div className="property-list">
        {properties.map((property) => (
          <div
            key={property._id}
            className="property-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 slide-in-right"
          >
            <h4 className="text-xl font-semibold">{property.title} - ${property.price}</h4>
            <p>{property.location}</p>
            <button
              onClick={() => handleDelete(property._id)}
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
