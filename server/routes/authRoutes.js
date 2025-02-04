const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register a new user
router.post("/signup", async (req, res) => {
    const { email, username, password, role } = req.body;
  
    // Check for missing required fields
    if (!email || !username || !password) {
      return res.status(400).json({ message: "Email, Username, and Password are required" });
    }
  
    // Validate role
    const validRoles = ["admin", "user", "agent"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
  
    try {
      // Check if user with this email already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        role: role || "user",  // Default to 'user' if no role is provided
      });
  
      const savedUser = await newUser.save();
      res.status(201).json({ message: "User registered successfully", savedUser });
    } catch (err) {
      console.error("Error during signup:", err);  // Log detailed error
      res.status(500).json({ message: "Server error during signup", error: err.message });
    }
  });
  
  router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and send a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error during login", error: err.message });
  }
});
  

module.exports = router;
