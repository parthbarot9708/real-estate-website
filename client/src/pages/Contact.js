import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import contactImage from "../images/contact.jpg";
import Footer from "../components/Footer";

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
    <>
      <div className="pt-32 px-4 pb-10 bg-gray-50 min-h-screen relative z-0">
        {/* Hero Section */}
        <div
          className="relative h-80 bg-cover bg-center rounded-lg overflow-hidden shadow-md"
          style={{ backgroundImage: `url(${contactImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl text-white font-bold">Contact Us</h1>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">We’d Love to Hear from You!</h2>
            <p className="text-gray-600 mb-6">
              Have a question, feedback, or just want to say hello? Fill out the form and we'll get back to you shortly.
            </p>

            {errors.length > 0 && (
              <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded">
                <ul className="text-red-600 list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>

            {submitMessage && (
              <p className="mt-4 text-center text-green-600 font-medium">{submitMessage}</p>
            )}
          </div>

          {/* Map Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Find Us Here</h2>
              <p className="text-gray-600">
                We are located in the heart of the city. Stop by or send us a message!
              </p>
            </div>

            <MapContainer
              center={position}
              zoom={13}
              className="h-96 w-full rounded-lg shadow-md z-10"
              style={{ zIndex: 0 }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>We are here!</Popup>
              </Marker>
            </MapContainer>

            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Office</h3>
              <p className="text-gray-600">123 Main Street, City, Country</p>
              <p className="text-gray-600">Open Monday to Friday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
