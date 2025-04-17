const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Property",
  },
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
