const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],  // Ensure email is required
      unique: true,  // Ensure the email is unique
    },
    username: {
      type: String,
      required: [true, "Username is required"],  // Ensure username is required
    },
    password: {
      type: String,
      required: [true, "Password is required"],  // Ensure password is required
    },
    role: {
      type: String,
      enum: ["admin", "user", "agent"],
      default: "user",  // Default role is 'user'
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
