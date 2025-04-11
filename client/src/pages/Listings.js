import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Listings() {
  const [properties, setProperties] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsername(response.data.username);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/properties");
        setProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="listings-container px-4 py-8">
      {username && (
        <motion.div
          className="text-green-600 text-xl text-center mb-4 font-semibold mt-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome, {username}!
        </motion.div>
      )}

      <h2 className="text-4xl font-semibold text-center mb-8 animate__animated animate__fadeInUp">
        Property Listings
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-lg font-medium text-gray-600 animate__animated animate__fadeIn animate__delay-1s">
          No properties available.
        </p>
      ) : (
        <div className="property-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property._id}
              className="property-card-container w-full h-80 perspective-1000"
            >
              <div className="flip-card relative w-full h-full">
                <div className="flip-card-inner w-full h-full absolute top-0 left-0 transition-transform duration-500 transform rotate-y-0 hover:rotate-y-180">
                  <div className="flip-card-front w-full h-full">
                    <img
                      src={property.image ? `http://localhost:5000/api/properties/image/${property.image}` : "/images/home1.jpg"}
                      alt={property.title}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/images/home1.jpg";
                      }}
                    />
                  </div>

                  <div className="flip-card-back w-full h-full bg-gray-800 p-6 text-white flex flex-col justify-center items-center rounded-lg transform rotate-y-180">
                    <h3 className="text-2xl font-semibold">{property.title}</h3>
                    <p>Location: {property.location}</p>
                    <p className="font-bold text-xl">${property.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Listings;
