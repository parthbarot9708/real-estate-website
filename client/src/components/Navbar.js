import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaClipboardList,
  FaPhone,
  FaUserShield,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import logo from "../images/logo.png";
import { useAuth } from "../context/AuthContext";
import { FaCogs } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar bg-gray-800 shadow-lg fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Property" className="w-20 h-20 object-contain" />
            <span className="text-white text-2xl font-bold">Elite Residence</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              <li className="text-white hover:text-gray-400 hover:scale-105 transition-all duration-300">
                <Link to="/" className="flex items-center space-x-2">
                  <FaHome />
                  <span>Home</span>
                </Link>
              </li>
              <li className="text-white hover:text-gray-400 hover:scale-105 transition-all duration-300">
                <Link to="/listings" className="flex items-center space-x-2">
                  <FaClipboardList />
                  <span>Listings</span>
                </Link>
              </li>
              <li className="text-white hover:text-gray-400 hover:scale-105 transition-all duration-300">
              <Link to="/services" className="flex items-center space-x-2">
                <FaCogs />
                <span>Services</span>
              </Link>
              </li>
              <li className="text-white hover:text-gray-400 hover:scale-105 transition-all duration-300">
                <Link to="/contact" className="flex items-center space-x-2">
                  <FaPhone />
                  <span>Contact</span>
                </Link>
              </li>

              {isLoggedIn && !isAdmin && (
                <li className="text-white hover:text-gray-400 hover:scale-105 transition-all duration-300">
                  <Link to="/my-appointments" className="flex items-center space-x-2">
                    <FaClipboardList />
                    <span>My Appointments</span>
                  </Link>
                </li>
              )}

              {isAdmin && (
                <li className="text-white hover:text-gray-400 hover:scale-105 transition-all duration-300">
                  <Link to="/admin" className="flex items-center space-x-2">
                    <FaUserShield />
                    <span>Admin</span>
                  </Link>
                </li>
              )}

              {!isLoggedIn ? (
                <>
                  <li className="text-white hover:text-gray-400 hover:scale-105 transition-all duration-300">
                    <Link to="/login" className="flex items-center space-x-2">
                      <FaSignInAlt />
                      <span>Login</span>
                    </Link>
                  </li>
                  <li className="text-white hover:text-gray-400 hover:scale-105 transition-all duration-300">
                    <Link to="/signup" className="flex items-center space-x-2">
                      <FaUserPlus />
                      <span>Signup</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li
                  className="text-white hover:text-gray-400 hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={handleLogout}
                >
                  <div className="flex items-center space-x-2">
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Icon */}
          <div className="menu-icon md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${menuOpen ? "block" : "hidden"} fixed inset-0 bg-gray-800 bg-opacity-75 z-40`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="flex justify-center items-center h-full">
          <ul className="text-white space-y-6 text-center text-lg">
            <li>
              <Link to="/" className="flex items-center justify-center space-x-2">
                <FaHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/listings" className="flex items-center justify-center space-x-2">
                <FaClipboardList />
                <span>Listings</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center justify-center space-x-2">
                <FaPhone />
                <span>Contact</span>
              </Link>
            </li>
            
            <li>
              <Link to="/services" className="flex items-center justify-center space-x-2">
                <FaPhone />
                <span>Services</span>
              </Link>
            </li>

            {isLoggedIn && !isAdmin && (
              <li>
                <Link to="/my-appointments" className="flex items-center justify-center space-x-2">
                  <FaClipboardList />
                  <span>My Appointments</span>
                </Link>
              </li>
            )}

            {isAdmin && (
              <li>
                <Link to="/admin" className="flex items-center justify-center space-x-2">
                  <FaUserShield />
                  <span>Admin</span>
                </Link>
              </li>
            )}

            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login" className="flex items-center justify-center space-x-2">
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="flex items-center justify-center space-x-2">
                    <FaUserPlus />
                    <span>Signup</span>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <div
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
