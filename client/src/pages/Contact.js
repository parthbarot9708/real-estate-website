import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import contactImage from "../images/contact.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = () => {
    let validationErrors = [];

    if (formData.name.trim().length < 3) {
      validationErrors.push("Name must be at least 3 characters long.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      validationErrors.push("Please enter a valid email address.");
    }

    if (formData.message.trim().length < 10) {
      validationErrors.push("Message must be at least 10 characters long.");
    }

    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setSubmitMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setErrors([]);
    } catch (error) {
      setSubmitMessage("Error sending message. Please try again later.");
    }
  };

  const position = [51.505, -0.09];

  return (
    <div className="contact-container px-4 py-8">
      {/* Hero Section with Background Image */}
      <div
        className="hero-section relative"
        style={{
          background: `url(${contactImage}) center/cover no-repeat`,
          height: "400px",
        }}
      >
        <div className="hero-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-semibold text-white animate__animated animate__fadeInUp">
            Contact Us
          </h1>
        </div>
      </div>

      <div className="content-wrapper mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form Section */}
        <div className="contact-form-container space-y-6 animate__animated animate__fadeIn animate__delay-1s">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">We’d Love to Hear from You!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Whether you have a question, feedback, or just want to say hello, we're always happy to connect. Please fill out the form below, and we'll get back to you as soon as possible.
          </p>

          {errors.length > 0 && (
            <div className="validation-summary mb-4 p-4 bg-red-100 border border-red-300 rounded">
              <ul className="text-red-600">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="textarea-field p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="submit-button p-3 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {submitMessage && (
            <p className="submit-message mt-4 text-center text-lg text-green-600">{submitMessage}</p>
          )}
        </div>

        {/* Map Section */}
        <div className="map-container space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Find Us Here</h2>
          <p className="text-lg text-gray-600 mb-6">
            We are located in the heart of the city, easily accessible by all modes of transportation. Feel free to stop by anytime, and we’ll be happy to meet you.
          </p>

          <MapContainer center={position} zoom={13} className="map-box h-96 rounded-lg shadow-md">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>We are here!</Popup>
            </Marker>
          </MapContainer>

          <div className="location-details bg-gray-100 p-6 rounded-lg mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Office</h3>
            <p className="text-lg text-gray-600">123 Main Street, City, Country</p>
            <p className="text-lg text-gray-600">Open Monday to Friday: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer mt-12 p-6 bg-gray-800 text-white text-center">
        <p className="text-lg">&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Contact;
