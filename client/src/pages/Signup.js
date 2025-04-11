import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const validateForm = () => {
    let validationErrors = [];

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      validationErrors.push("Please enter a valid email address.");
    }

    if (username.length < 3) {
      validationErrors.push("Username must be at least 3 characters long.");
    }

    if (password.length < 6) {
      validationErrors.push("Password must be at least 6 characters long.");
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        username,
        password,
        role,
      });

      alert(response.data.message);
      navigate("/login"); // Redirect to login after successful signup
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setErrors([err.response?.data?.message || "Something went wrong."]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ease-in-out">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6 animate__animated animate__fadeInUp animate__delay-1s">
          Sign Up
        </h2>

        {/* Error message section */}
        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-lg shadow-md animate__animated animate__fadeIn animate__delay-1s">
            <ul>
              {errors.map((error, index) => (
                <li key={index} className="text-sm">{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-transform duration-300 transform hover:scale-105 ${errors.includes("Please enter a valid email address.") ? "border-red-500" : ""}`}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-transform duration-300 transform hover:scale-105 ${errors.includes("Username must be at least 3 characters long.") ? "border-red-500" : ""}`}
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-transform duration-300 transform hover:scale-105 ${errors.includes("Password must be at least 6 characters long.") ? "border-red-500" : ""}`}
              required
            />
          </div>

          <div className="mb-6">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 ease-in-out"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline transform transition duration-300 hover:scale-105">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
