const express = require("express");
const multer = require("multer");
const Property = require("../models/Property");
const { authorizeAdmin } = require("../middleware/authorize");
const mongoose = require("mongoose");

const setupRoutes = () => {
  const router = express.Router();

  // Configure multer to store files in memory temporarily
  const storage = multer.memoryStorage();
  const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only images are allowed"));
      }
    },
  }).single("image");

  router.post("/add", authorizeAdmin, upload, async (req, res) => {
    console.log("Received POST /api/properties/add");
    console.log("Request body:", req.body);
    console.log("File:", req.file);

    const { title, description, price, category, location, createdBy } = req.body;

    if (!title || !description || !price || !category || !location) {
      return res.status(400).json({ message: "All fields except image are required" });
    }

    let imageId = null;
    if (req.file) {
      try {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
          bucketName: "propertyImages",
        });

        const uploadStream = bucket.openUploadStream(`${Date.now()}-${req.file.originalname}`);
        imageId = uploadStream.id;

        const bufferStream = require("stream").Readable.from(req.file.buffer);
        bufferStream.pipe(uploadStream);

        await new Promise((resolve, reject) => {
          uploadStream.on("finish", resolve);
          uploadStream.on("error", reject);
        });

        console.log("File uploaded to GridFS with ID:", imageId);
      } catch (err) {
        console.error("GridFS upload error:", err);
        return res.status(500).json({ message: "Error uploading image to GridFS", error: err.message });
      }
    }

    const newProperty = new Property({
      title,
      description,
      price,
      image: imageId,
      category,
      location,
      createdBy: req.user ? req.user._id : null,
    });

    try {
      const savedProperty = await newProperty.save();
      console.log("Property saved:", savedProperty);
      res.status(201).json({ message: "Property added successfully", savedProperty });
    } catch (err) {
      console.error("Error saving property:", err.message);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  router.put("/edit/:id", authorizeAdmin, async (req, res) => {
    const { title, description, price, image, category, location } = req.body;
    const { id } = req.params;

    try {
      const updatedProperty = await Property.findByIdAndUpdate(
        id,
        { title, description, price, image, category, location },
        { new: true }
      );

      if (!updatedProperty) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.status(200).json({ message: "Property updated", updatedProperty });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  router.delete("/delete/:id", authorizeAdmin, async (req, res) => {
    const { id } = req.params;

    try {
      const deletedProperty = await Property.findByIdAndDelete(id);

      if (!deletedProperty) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.status(200).json({ message: "Property deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const properties = await Property.find();
      res.status(200).json(properties);
    } catch (err) {
      console.error("Error fetching properties:", err);
      res.status(500).json({ message: "Server error while fetching properties", error: err.message });
    }
  });

  router.get("/category/:category", async (req, res) => {
    const { category } = req.params;
    try {
      const properties = await Property.find({ category });
      res.status(200).json(properties);
    } catch (err) {
      console.error("Error fetching properties by category:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  router.get("/image/:id", (req, res) => {
    const { id } = req.params;
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "propertyImages",
    });

    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(id));
    res.set("Content-Type", "image/gif");
    downloadStream.on("error", (err) => {
      console.error("Error streaming image:", err);
      res.status(404).json({ message: "Image not found" });
    });
    downloadStream.pipe(res);
  });

  return router;
};

module.exports = setupRoutes;