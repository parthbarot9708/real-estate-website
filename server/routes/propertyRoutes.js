const express = require("express");
const Property = require("../models/Property");
const { authorizeAdmin } = require("../middleware/authorize"); // Correct path

const router = express.Router();

// Create a new property listing
router.post("/add", authorizeAdmin, async (req, res) => {
    const { title, description, price, image, category, location, createdBy } = req.body;
  
    const newProperty = new Property({
      title,
      description,
      price,
      image,
      category,
      location,
      createdBy,
    });

    try {
        const savedProperty = await newProperty.save();
        res.status(201).json({ message: "Property added successfully", savedProperty });
        } catch (err) {
        res.status(500).json({ message: "Server error" });
        }
    }
);

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
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Admin - Delete a property
  router.delete("/delete/:id", authorizeAdmin, async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedProperty = await Property.findByIdAndDelete(id);
  
      if (!deletedProperty) {
        return res.status(404).json({ message: "Property not found" });
      }
  
      res.status(200).json({ message: "Property deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

// Get all properties
router.get("/", authorizeAdmin, async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching properties", error: err.message });
  }
});

// Get properties by category
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const properties = await Property.find({ category });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
