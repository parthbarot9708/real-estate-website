import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Listings.css";

function Listings() {
  const [properties, setProperties] = useState([]);

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
    <div className="listings-container">
      <h2>Property Listings</h2>

      {properties.length === 0 ? (
        <p className="no-properties">No properties available.</p>
      ) : (
        <div className="property-cards">
          {properties.map((property) => (
            <div key={property._id} className="property-card">
              <img
                src={
                  property.image
                    ? `http://localhost:5000/api/properties/image/${property.image}`
                    : "/images/home1.jpg"
                }
                alt={property.title}
                onError={(e) => {
                  e.target.src = "/images/home1.jpg"; // Fallback if image fails
                }}
              />
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <p className="price">Price: ${property.price}</p>
              <p className="location">Location: {property.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Listings;