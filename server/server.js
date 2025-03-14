const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const setupPropertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const fs = require("fs");

const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Created uploads directory:", uploadDir);
}

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

connectDB().then(() => {
  app.use("/api/auth", authRoutes);
  app.use("/api/properties", setupPropertyRoutes());
  app.use("/api/users", userRoutes);
  app.use("/api/contact", contactRoutes); // Add contact routes here

  app.get("/", (req, res) => {
    res.send("API is running...");
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB:", err.message);
  process.exit(1);
});

console.log("Mongo URI: ", process.env.MONGO_URI);
