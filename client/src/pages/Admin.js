import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Admin.css";

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
      <div className="admin-container">
        <h2>Admin Login</h2>
        <form className="admin-form" onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" value={loginForm.email} onChange={handleLoginChange} required />
          {errors.email && <p className="error-message">{errors.email}</p>}
          
          <input type="password" name="password" placeholder="Password" value={loginForm.password} onChange={handleLoginChange} required />
          {errors.password && <p className="error-message">{errors.password}</p>}
          
          <button type="submit" className="cta-button">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h2>Admin - Manage Listings</h2>
      <button className="cta-button" onClick={() => { localStorage.removeItem("token"); setIsLoggedIn(false); }}>Logout</button>
      
      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        {errors.title && <p className="error-message">{errors.title}</p>}

        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        {errors.description && <p className="error-message">{errors.description}</p>}

        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        {errors.price && <p className="error-message">{errors.price}</p>}

        <input type="file" name="image" onChange={handleChange} />
        {errors.image && <p className="error-message">{errors.image}</p>}

        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        {errors.category && <p className="error-message">{errors.category}</p>}

        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        {errors.location && <p className="error-message">{errors.location}</p>}

        <button type="submit" className="cta-button">Add Property</button>
      </form>

      <h3>Existing Listings</h3>
      <div className="property-list">
        {properties.map((property) => (
          <div key={property._id} className="property-card">
            <h4>{property.title} - ${property.price}</h4>
            <button className="view-details-btn" onClick={() => handleDelete(property._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
