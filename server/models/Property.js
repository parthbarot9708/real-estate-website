const mongoose = require("mongoose");

const propertySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "fs.files" }, // GridFS ObjectId
    category: { type: String, required: true },
    location: { type: String, required: true },
    address: { type:String, requried:true},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;