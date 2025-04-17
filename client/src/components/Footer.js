import React from "react";
import { Link } from "react-router-dom"; // If you're using react-router for navigation

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h4 className="text-xl font-bold mb-4">About Us</h4>
            <p className="text-gray-400">
              We are a real estate company that connects people with their dream homes. Our mission is to make the process simple and seamless.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-white">
                  Listings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="text-xl font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i> {/* Assuming you're using Font Awesome */}
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <p className="text-gray-400">
              1234 Real Estate St, City, Country
            </p>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
            <p className="text-gray-400">Email: info@realestate.com</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Real Estate Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
