import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css"; // Import the CSS file

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState([]); // Store validation errors
  const navigate = useNavigate();

  // Validation function
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
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>

        {errors.length > 0 && (
          <div className="validation-summary">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.includes("Please enter a valid email address.") ? "input-error" : ""}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={errors.includes("Username must be at least 3 characters long.") ? "input-error" : ""}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.includes("Password must be at least 6 characters long.") ? "input-error" : ""}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="user">User</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
