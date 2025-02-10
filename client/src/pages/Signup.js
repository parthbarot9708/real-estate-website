import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css"; // Import the CSS file

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Signup Data:", { email, username, password, role }); // Log all data

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
      console.error(err.response ? err.response.data : err.message); // Log detailed error
      alert("Error: " + (err.response ? err.response.data.message : "Something went wrong"));
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Ensure email is set
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Ensure username is set
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Ensure password is set
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)} // Ensure role is set
        >
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
