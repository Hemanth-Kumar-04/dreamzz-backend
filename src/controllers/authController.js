// src/controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  const { email, password, userId, gender } = req.body;
  if (!email || !password || !userId || !gender) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
    if (existingUser) {
      return res.status(400).json({ error: "Email or User ID already exists." });
    }
    // Store password in plain text for testing (do not use in production)
    const user = new User({ email, password, userId, gender });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error registering user." });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // Plain text comparison (for testing only)
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in." });
  }
};
