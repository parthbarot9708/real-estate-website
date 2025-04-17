import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookAppointment = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "", date: "", time: "", message: ""
  });
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchUserAndCheck = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        setUserData({ name: res.data.username, email: res.data.email });

        const apptRes = await axios.get("http://localhost:5000/api/appointments/my", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const already = apptRes.data.find(a => a.listingId === listingId);
        if (already) setAlreadyBooked(true);

      } catch (err) {
        console.error("Error loading user or appointments:", err);
      }
    };

    fetchUserAndCheck();
  }, [listingId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/appointments", {
        ...form,
        listingId,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit appointment:", err);
    }
  };

  if (alreadyBooked) {
    return (
      <div className="max-w-md mx-auto mt-20 p-4 text-center text-red-600 font-semibold">
        You have already booked an appointment for this property.
        <br />
        <button
          onClick={() => navigate("/my-appointments")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to My Appointments
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-20 p-4 text-center text-green-600 font-semibold">
        🎉 Appointment booked successfully!
        <br />
        <button
          onClick={() => navigate("/my-appointments")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          View My Appointments
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 space-y-4 p-4 border rounded"
    >
      <input
        value={userData.name}
        disabled
        className="w-full p-2 border rounded bg-gray-100"
      />
      <input
        value={userData.email}
        disabled
        className="w-full p-2 border rounded bg-gray-100"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message"
        className="w-full p-2 border rounded"
        rows="3"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Book Appointment
      </button>
    </form>
  );
};

export default BookAppointment;
