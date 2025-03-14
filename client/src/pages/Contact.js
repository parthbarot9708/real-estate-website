import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "../styles/Contact.css";
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
    <div className="contact-container">
      <div className="hero-section" style={{ background: `url(${contactImage}) center/cover no-repeat` }}>
        <div className="hero-overlay">
          <h1>Contact Us</h1>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="contact-form-container">
          <h2>Get in Touch</h2>

          {errors.length > 0 && (
            <div className="validation-summary">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="textarea-field"
            />
            <button type="submit" className="submit-button">Send Message</button>
          </form>

          {submitMessage && <p className="submit-message">{submitMessage}</p>}
        </div>

        <div className="map-container">
          <h2>Our Location</h2>
          <MapContainer center={position} zoom={13} className="map-box">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>We are here!</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Contact;
