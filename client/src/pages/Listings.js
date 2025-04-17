import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Listings() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsername(response.data.username);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    if (isLoggedIn) fetchUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/properties");
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    let results = [...properties];

    if (search.trim()) {
      results = results.filter((prop) =>
        prop.title.toLowerCase().includes(search.toLowerCase()) ||
        prop.location.toLowerCase().includes(search.toLowerCase()) ||
        prop.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (locationFilter) {
      results = results.filter((prop) => prop.location === locationFilter);
    }

    if (maxPriceFilter) {
      results = results.filter((prop) => prop.price <= parseFloat(maxPriceFilter));
    }

    if (sortOrder === "price-asc") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      results.sort((a, b) => b.price - a.price);
    }

    setFilteredProperties(results);
  }, [search, locationFilter, maxPriceFilter, sortOrder, properties]);

  const uniqueLocations = [...new Set(properties.map((prop) => prop.location))];

  const handleBookClick = (id) => {
    if (!isLoggedIn) {
      alert("Please log in to book an appointment.");
      navigate("/login");
    } else {
      navigate(`/book-appointment/${id}`);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row px-4 py-8 gap-8">
        {/* Sidebar Filter */}
        <div className="lg:w-1/4 space-y-4 mt-20">
          <h3 className="text-xl font-semibold">Filter Properties</h3>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, location or type"
            className="w-full p-2 border rounded"
          />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Max Price"
            value={maxPriceFilter}
            onChange={(e) => setMaxPriceFilter(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
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

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Listings</h2>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {filteredProperties.length === 0 ? (
            <p className="text-center text-lg font-medium text-gray-600">No properties available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <div key={property._id} className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-all">
                  <img
                    src={property.image ? `http://localhost:5000/api/properties/image/${property.image}` : "/images/home1.jpg"}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/images/home1.jpg";
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                    <p className="text-gray-600 mb-1">Location: {property.location}</p>
                    <p className="text-gray-600 mb-1">Type: {property.category}</p>
                    <p className="text-blue-600 text-lg font-bold mb-4">${property.price}</p>
                    <button
                      onClick={() => handleBookClick(property._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Listings;
