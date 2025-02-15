const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  const { email, password, userId, gender, username, bio, profilePic } = req.body;

  if (!email || !password || !userId || !gender || !username) {
    return res.status(400).json({ error: "All fields except bio and profilePic are required." });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
    if (existingUser) {
      return res.status(400).json({ error: "Email or User ID already exists." });
    }

    const newUser = new User({
      email,
      password,
      userId,
      gender,
      username,
      bio: bio || "",
      profilePic: profilePic || "",
      posts: [],
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error registering user." });
  }
};



exports.loginUser = async (req, res) => {
  const { identifier, password } = req.body; // `identifier` can be email or userId

  if (!identifier || !password) {
    return res.status(400).json({ error: "Email/User ID and password are required." });
  }

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { userId: identifier }],
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });

    res.json({
      message: "Login successful.",
      token,
      user: {
        userId: user.userId,
        email: user.email,
        username: user.username,
        gender: user.gender,
        bio: user.bio,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in." });
  }
};

