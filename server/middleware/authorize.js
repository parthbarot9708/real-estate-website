const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authorizeAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authorizeAdmin };
