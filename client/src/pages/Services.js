import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Services = () => {
  return (
    <div className="pt-24 px-6 pb-10 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <motion.h1
        className="text-4xl font-bold text-center text-blue-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Real Estate Services
      </motion.h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service 1 */}
        <motion.div
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-2">Property Sales</h3>
          <p className="text-gray-600">
            We assist you in selling your property at the best market price, offering staging advice and marketing strategies to attract serious buyers.
          </p>
        </motion.div>

        {/* Service 2 */}
        <motion.div
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-2">Property Buying</h3>
          <p className="text-gray-600">
            We help clients find the perfect home or investment property by understanding their needs and providing personalized recommendations.
          </p>
        </motion.div>

        {/* Service 3 */}
        <motion.div
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-2">Rental Management</h3>
          <p className="text-gray-600">
            Comprehensive property management services for landlords, including tenant screening, rent collection, and maintenance.
          </p>
        </motion.div>

        {/* Service 4 */}
        <motion.div
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-2">Property Evaluation</h3>
          <p className="text-gray-600">
            Get expert property valuation services to determine the accurate market value of your property using comparative analysis.
          </p>
        </motion.div>

        {/* Service 5 */}
        <motion.div
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-2">Legal Assistance</h3>
          <p className="text-gray-600">
            Our team provides legal support for real estate transactions including documentation, contract reviews, and compliance.
          </p>
        </motion.div>

        {/* Service 6 */}
        <motion.div
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl font-semibold mb-2">Home Staging & Photography</h3>
          <p className="text-gray-600">
            Make your listings stand out with our professional home staging and real estate photography services.
          </p>
        </motion.div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Ready to Work With Us?</h2>
        <p className="mb-6 text-gray-600">Get in touch today and experience hassle-free real estate services tailored to you.</p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full transition"
        >
          Contact Us
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
