import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUser, FaClipboardList, FaPhone, FaUserShield } from "react-icons/fa";
import "../styles/Navbar.css";
import logo from "../images/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <img src={logo} alt="Property" />
      </div>

      {/* Mobile Menu Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar Links */}
      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}><FaHome /> Home</Link></li>
        <li><Link to="/login" onClick={() => setMenuOpen(false)}><FaUser /> Login</Link></li>
        <li><Link to="/signup" onClick={() => setMenuOpen(false)}><FaUser /> Signup</Link></li>
        <li><Link to="/listings" onClick={() => setMenuOpen(false)}><FaClipboardList /> Listings</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}><FaPhone /> Contact</Link></li>
        <li><Link to="/admin" onClick={() => setMenuOpen(false)}><FaUserShield /> Admin</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
