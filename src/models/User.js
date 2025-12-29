const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  photoURL: {
    type: String,
    default: "",
  },

  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },

  district: {
    type: String,
  },

  role: {
    type: String,
    enum: ["donor", "volunteer", "admin"],
    default: "donor",
  },

  status: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("User", userSchema);
