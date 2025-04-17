import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ date: "", time: "", message: "" });

  const fetchUserAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments/my", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  useEffect(() => {
    fetchUserAppointments();
  }, []);

  const handleEditClick = (appt) => {
    setEditId(appt._id);
    setEditForm({ date: appt.date, time: appt.time, message: appt.message });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}`, editForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEditId(null);
      fetchUserAppointments();
      alert("✅ Appointment updated successfully.");
    } catch (err) {
      console.error("Update failed", err);
      alert("❌ Failed to update appointment.");
    }
  };

  const handleCancel = async (id) => {
    const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchUserAppointments();
      alert("🗑️ Appointment cancelled.");
    } catch (err) {
      console.error("Cancel failed", err);
      alert("❌ Failed to cancel appointment.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">You have no appointments yet.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                {editId === appt._id ? (
                  <>
                    <td className="border px-4 py-2">
                      <input
                        type="date"
                        name="date"
                        value={editForm.date}
                        onChange={handleEditChange}
                        className="w-full border rounded p-1"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="time"
                        name="time"
                        value={editForm.time}
                        onChange={handleEditChange}
                        className="w-full border rounded p-1"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        name="message"
                        value={editForm.message}
                        onChange={handleEditChange}
                        className="w-full border rounded p-1"
                      />
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      <button onClick={() => handleUpdate(appt._id)} className="text-green-600">Save</button>
                      <button onClick={() => setEditId(null)} className="text-gray-500">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{appt.date}</td>
                    <td className="border px-4 py-2">{appt.time}</td>
                    <td className="border px-4 py-2">{appt.message}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button onClick={() => handleEditClick(appt)} className="text-blue-600">Edit</button>
                      <button onClick={() => handleCancel(appt._id)} className="text-red-600">Cancel</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAppointments;
