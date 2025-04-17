import React from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";


const AboutUs = () => {
  return (
    <>
    <div className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto text-center">
        {/* Title Section with Animation */}
        <motion.h1
          className="text-4xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About Us
        </motion.h1>

        {/* Description Section with Animation */}
        <motion.p
          className="text-lg text-gray-600 mb-10 px-4 sm:px-0"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Welcome to XYZ Property Management, where we take pride in managing the finest residential and commercial properties.
          Our team ensures each property is well-maintained, providing a high-quality living experience for tenants and a hassle-free ownership experience for property owners.
        </motion.p>

        {/* Mission Section with Animation */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-8 mb-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600">
            Our mission is to offer exceptional property management services to ensure that tenants have a comfortable living
            experience while maximizing the value of the properties we manage.
          </p>
        </motion.div>

        {/* Team Section with Animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Team Member 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/200" alt="Team Member" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800">Parth Barot</h4>
              <p className="text-gray-600">Property Manager</p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/200" alt="Team Member" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800">Navdeep Kaur</h4>
              <p className="text-gray-600">Customer Support</p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/200" alt="Team Member" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800">Jay Patel</h4>
              <p className="text-gray-600">Maintenance Coordinator</p>
            </div>
          </div>

          {/* Team Member 4 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/200" alt="Team Member" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800">Minna Jose</h4>
              <p className="text-gray-600">Maintenance Coordinator</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Call-to-Action Section */}
        <motion.div
          className="bg-blue-600 text-white rounded-lg p-8 mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <h3 className="text-3xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-lg mb-6">
            Have any questions or need assistance? Our team is here to help you with any property management needs.
          </p>
          <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AboutUs;
