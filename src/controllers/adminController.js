const User = require("../models/User");
const Dream = require("../models/Dream");
const Chat = require("../models/Chat");
const Review = require("../models/Review");

exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const dreamCount = await Dream.countDocuments();
    const chatCount = await Chat.countDocuments();
    const reviewCount = await Review.countDocuments();
    res.json({ userCount, dreamCount, chatCount, reviewCount });
  } catch (error) {
    res.status(500).json({ error: "Error fetching statistics." });
  }
};
