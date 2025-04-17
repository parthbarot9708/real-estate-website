import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = [];
    if (!email) errors.push("Email is required");
    if (!password) errors.push("Password is required");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
  
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      // Save token, role, and username in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", response.data.username); // Store username
  
      // Redirect to /listings with welcome state
      navigate("/listings", {
        state: { welcome: `Welcome, ${response.data.username}!` },
      });
  
      // Force reload to ensure role-based navbar update
      window.location.reload();
    } catch (err) {
      console.error(err);
      setErrors([err.response?.data?.message || "Login failed. Please try again."]);
    }
  };  

  return (
    <>
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md mt-12">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>

      {errors.length > 0 && (
        <div className="mt-4 text-red-500">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Login;
