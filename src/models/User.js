// src/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // For testing, store in plain text
  userId: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["male", "female"], required: true }
});

module.exports = mongoose.model("User", UserSchema);
    