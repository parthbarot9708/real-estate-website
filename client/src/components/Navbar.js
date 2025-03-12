import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUser, FaClipboardList, FaPhone, FaUserShield } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      
      <div className="logo">
        <img src="/images/logo.png" alt="Elite Residence Logo" className="hero-image" />
      </div>

      
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      
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
