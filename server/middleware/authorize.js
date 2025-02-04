const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authorizeAdmin = async (req, res, next) => {
  try {
    // Verify token
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { authorizeAdmin };
