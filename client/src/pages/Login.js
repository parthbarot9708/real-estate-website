import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState(""); // Change username to email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email, // Pass email instead of username
        password,
      });

      setToken(response.data.token); // Save JWT token
      navigate("/"); // Redirect to homepage or dashboard
    } catch (err) {
      console.error(err);
      alert("Error: " + err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email" // Use type="email" for validation
          placeholder="Email"
          value={email} // Bind email state
          onChange={(e) => setEmail(e.target.value)} // Set email
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
