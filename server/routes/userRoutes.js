const express = require("express");
const User = require("../models/User");
const { authorizeAdmin } = require("../middleware/authorize");
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Profile route to get user information
router.get("/profile", auth, async (req, res) => {
  try {
    // Get the user by ID from the decoded JWT token
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the username and other user info as needed
    res.json({ username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

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
