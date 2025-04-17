const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const { authorizeAdmin } = require("../middleware/authorize");
const auth = require("../middleware/authMiddleware");

// Create Appointment (Auth Required)
router.post("/", auth, async (req, res) => {
  try {
    const { phone, date, time, message, listingId } = req.body;

    const appointment = new Appointment({
      name: req.user.username,
      email: req.user.email,
      phone,
      date,
      time,
      message,
      listingId,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ message: "Error booking appointment" });
  }
});

// Admin: View All Appointments
router.get("/", authorizeAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

// Authenticated User: View Their Appointments
router.get("/my", auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ email: req.user.email }).sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
});

// Update (Only if appointment belongs to user)
router.put("/:id", auth, async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment) return res.status(404).json({ message: "Appointment not found" });
  
      // Allow admins or the user who created the appointment
      if (appointment.email !== req.user.email && req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
  
      const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Error updating appointment" });
    }
  });

// Delete (Only if appointment belongs to user)
router.delete("/:id", auth, async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment) return res.status(404).json({ message: "Appointment not found" });
  
      // Allow admins or the user who created the appointment
      if (appointment.email !== req.user.email && req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
  
      await Appointment.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting appointment" });
    }
  });

module.exports = router;
