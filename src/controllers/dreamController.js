// src/controllers/dreamController.js
const Dream = require("../models/Dream");

exports.postDream = async (req, res) => {
  const { title, content, tags, bookmark } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required." });
  }
  if (tags && tags.length > 2) {
    return res.status(400).json({ error: "Maximum 2 tags allowed." });
  }
  try {
    const dream = new Dream({
      user: req.user.userId, // Set by authMiddleware
      title,
      content,
      tags: tags || [],
      bookmark: bookmark || false
    });
    await dream.save();
    res.status(201).json({ message: "Dream posted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error posting dream." });
  }
};

exports.getDreams = async (req, res) => {
  try {
    const dreams = await Dream.find({ user: req.user.userId });
    res.json(dreams);
  } catch (error) {
    res.status(500).json({ error: "Error fetching dreams." });
  }
};
