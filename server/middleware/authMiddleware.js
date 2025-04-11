const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // Use Authorization header to extract the token
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id; // Store the user ID from the token
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = auth;
