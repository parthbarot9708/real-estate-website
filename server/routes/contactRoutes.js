const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Create a schema for Contact Form submissions
const contactSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

// Post route to save contact form data
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Received data:", { name, email, message });

  const newContact = new Contact({
    name,
    email,
    message,
  });

  try {
    const savedContact = await newContact.save();
    console.log("Saved contact:", savedContact);
    res.status(201).json({ message: "Contact form submitted successfully", savedContact });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ message: "Server error, could not save contact form." });
  }
});

module.exports = router;
