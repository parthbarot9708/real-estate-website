const express = require("express");
const User = require("../models/User");
const { authorizeAdmin } = require("../middleware/authorize");
const router = express.Router();

// Admin - Promote a user to admin
router.put("/promote/:id", authorizeAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { role: "admin" }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User promoted to admin", updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin - Demote a user to regular user
router.put("/demote/:id", authorizeAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { role: "user" }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User demoted", updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin - Delete a user
router.delete("/delete/:id", authorizeAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
