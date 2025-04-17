import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("properties");
  const [properties, setProperties] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [editAppointmentId, setEditAppointmentId] = useState(null);
  const [editForm, setEditForm] = useState({ date: "", time: "", message: "" });
  const [editPropertyId, setEditPropertyId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    category: "",
    location: "",
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    if (isLoggedIn) {
      fetchProperties();
      fetchAppointments();
    }
  }, [isLoggedIn]);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const handlePropertyChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) data.append(key, value); // avoid appending null image
      });
  
      if (editPropertyId) {
        await axios.put(`http://localhost:5000/api/properties/edit/${editPropertyId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("✅ Property updated successfully.");
        setEditPropertyId(null);
      } else {
        await axios.post("http://localhost:5000/api/properties/add", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("✅ Property added successfully.");
      }
  
      setForm({ title: "", description: "", price: "", image: null, category: "", location: "" });
      fetchProperties();
    } catch (err) {
      console.error("Failed to submit property:", err);
      alert("❌ Failed to save property.");
    }
  };
  

  const handlePropertyEdit = (property) => {
    setEditPropertyId(property._id);
    setForm({
      title: property.title,
      description: property.description,
      price: property.price,
      image: null,
      category: property.category,
      location: property.location,
    });
  };

  const handlePropertyDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/properties/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("🗑️ Property deleted.");
      fetchProperties();
    } catch (err) {
      console.error("Failed to delete property:", err);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("🗑️ Appointment deleted.");
      fetchAppointments();
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  const handleEditClick = (appointment) => {
    setEditAppointmentId(appointment._id);
    setEditForm({ date: appointment.date, time: appointment.time, message: appointment.message });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}`, editForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("✅ Appointment updated successfully.");
      setEditAppointmentId(null);
      fetchAppointments();
    } catch (err) {
      console.error("Failed to update appointment", err);
      alert("❌ Failed to update appointment.");
    }
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", loginForm);
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" placeholder="Email" onChange={handleLoginChange} className="w-full p-2 border rounded" required />
          <input name="password" type="password" placeholder="Password" onChange={handleLoginChange} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    );
  }

  return (
    <>
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      <div className="flex justify-center mb-6 space-x-4">
        <button onClick={() => setActiveTab("properties")} className={`px-4 py-2 rounded ${activeTab === "properties" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Properties</button>
        <button onClick={() => setActiveTab("appointments")} className={`px-4 py-2 rounded ${activeTab === "appointments" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>Appointments</button>
      </div>

      {activeTab === "properties" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">{editPropertyId ? "Edit Property" : "Add Property"}</h2>
          <form onSubmit={handlePropertySubmit} className="space-y-3 mb-8">
            <input name="title" value={form.title} placeholder="Title" onChange={handlePropertyChange} className="w-full p-2 border rounded" required />
            <input name="description" value={form.description} placeholder="Description" onChange={handlePropertyChange} className="w-full p-2 border rounded" required />
            <input name="price" value={form.price} placeholder="Price" onChange={handlePropertyChange} className="w-full p-2 border rounded" required />
            <input name="location" value={form.location} placeholder="Location" onChange={handlePropertyChange} className="w-full p-2 border rounded" required />
            <input name="category" value={form.category} placeholder="Category" onChange={handlePropertyChange} className="w-full p-2 border rounded" />
            <input type="file" name="image" onChange={handleImageChange} className="w-full p-2 border rounded" />
            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">{editPropertyId ? "Update" : "Submit"}</button>
          </form>

          <h2 className="text-xl font-semibold mb-2">All Properties</h2>
          <ul className="space-y-3">
            {properties.map((prop) => (
              <li key={prop._id} className="p-3 border rounded bg-gray-50 flex justify-between items-center">
                <div>
                  <strong>{prop.title}</strong> - ${prop.price} ({prop.location})
                </div>
                <div className="space-x-2">
                  <button onClick={() => handlePropertyEdit(prop)} className="text-blue-600">Edit</button>
                  <button onClick={() => handlePropertyDelete(prop._id)} className="text-red-600">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "appointments" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Time</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id}>
                  <td className="border px-4 py-2">{a.name}</td>
                  <td className="border px-4 py-2">{a.email}</td>
                  <td className="border px-4 py-2">{a.phone}</td>
                  {editAppointmentId === a._id ? (
                    <>
                      <td className="border px-4 py-2">
                        <input type="date" name="date" value={editForm.date} onChange={handleEditChange} className="w-full p-1 border rounded" />
                      </td>
                      <td className="border px-4 py-2">
                        <input type="time" name="time" value={editForm.time} onChange={handleEditChange} className="w-full p-1 border rounded" />
                      </td>
                      <td className="border px-4 py-2">
                        <input name="message" value={editForm.message} onChange={handleEditChange} className="w-full p-1 border rounded" />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border px-4 py-2">{a.date}</td>
                      <td className="border px-4 py-2">{a.time}</td>
                      <td className="border px-4 py-2">{a.message}</td>
                    </>
                  )}
                  <td className="border px-4 py-2 space-x-2">
                    {editAppointmentId === a._id ? (
                      <>
                        <button onClick={() => handleEditSubmit(a._id)} className="text-green-600">Save</button>
                        <button onClick={() => setEditAppointmentId(null)} className="text-gray-500">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(a)} className="text-blue-600">Edit</button>
                        <button onClick={() => handleDeleteAppointment(a._id)} className="text-red-600">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Admin;
