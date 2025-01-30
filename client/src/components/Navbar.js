import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import the CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Elite Residence</h2>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/listings">Listings</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
