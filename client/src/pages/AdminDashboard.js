import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/auth"; // Create utility to get the JWT token

function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch properties and users
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = getToken(); // Get token from localStorage
        const response = await axios.get("http://localhost:5000/api/properties", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the header
          },
        });
        setProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = getToken(); // Get token from localStorage
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the header
          },
        });
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchProperties();
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        <h3>Properties</h3>
        {properties.map((property) => (
          <div key={property._id}>
            <h4>{property.title}</h4>
            <p>{property.description}</p>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>

      <div>
        <h3>Users</h3>
        {users.map((user) => (
          <div key={user._id}>
            <h4>{user.username} - {user.role}</h4>
            <button>Promote</button>
            <button>Demote</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
