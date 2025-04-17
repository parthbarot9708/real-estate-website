import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propertyImage1 from "../images/home1.jpg";
import propertyImage2 from "../images/home2.jpg";
import propertyImage3 from "../images/home3.jpg";
import companyImage from "../images/company.jpg";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const testimonials = [
  { quote: "Absolutely the best real estate platform! Found my dream home in no time!", name: "Sarah Johnson" },
  { quote: "Seamless experience and great customer service. Highly recommended!", name: "Michael Smith" },
  { quote: "I couldn’t have asked for a better home-buying experience. Excellent team!", name: "Emma Williams" },
];

const properties = [
  { title: "Modern Apartment", image: propertyImage1 },
  { title: "Luxury Villa", image: propertyImage2 },
  { title: "Cozy Townhouse", image: propertyImage3 },
];

function Home() {
  const navigate = useNavigate();
  const [randomTestimonial, setRandomTestimonial] = useState(testimonials[0]);

  useEffect(() => {
    setRandomTestimonial(testimonials[Math.floor(Math.random() * testimonials.length)]);
  }, []);

  return (
    <div className="bg-[#f8f9fb] font-sans">
      {/* Hero Section */}
      <section
        className="relative h-[85vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${companyImage})` }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="relative z-20 text-center text-white px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-xl animate-glow"
          >
            Welcome to <span className="text-yellow-400">Elite Residence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-xl md:text-2xl font-light mb-6"
          >
            Your dream home is just a click away. Explore stunning properties, modern homes, and luxury spaces.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold text-lg hover:bg-yellow-600 transition duration-300"
            onClick={() => navigate("/listings")}
          >
            Explore Listings
          </motion.button>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 text-center bg-white">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Featured Property Types
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {properties.map((property, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 rounded-lg shadow-lg overflow-hidden transition duration-300"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{property.title}</h3>
                
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => navigate("/listings")}
                >
                  View Properties
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-blue-50 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-lg shadow-md max-w-sm transform hover:scale-105 hover:shadow-xl transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
              <h4 className="text-lg font-semibold text-gray-900">- {t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-4"
        >
          Looking for Your Perfect Home?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg mb-8"
        >
          We offer premium listings, expert support, and unbeatable service.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.08 }}
          className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition"
          onClick={() => navigate("/listings")}
        >
          Get Started
        </motion.button>
      </section>

      <Footer />
    </div>
  );
}

export default Home;