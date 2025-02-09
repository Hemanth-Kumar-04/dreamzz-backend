// src/controllers/reviewController.js
const Review = require("../models/Review");
const Chat = require("../models/Chat");

exports.submitReview = async (req, res) => {
  const { chatId, reviewText } = req.body;
  if (!chatId || !reviewText) {
    return res.status(400).json({ error: "Chat ID and review text are required." });
  }
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }
    const userId = req.user.userId; // Set by authMiddleware

    if (userId !== String(chat.user1) && userId !== String(chat.user2)) {
      return res.status(403).json({ error: "You are not part of this chat." });
    }

    let review = await Review.findOne({ chat: chatId });
    if (!review) {
      review = new Review({ chat: chatId });
    }

    // Save the review in the corresponding field with reviewer ID.
    if (userId === String(chat.user1)) {
      review.user1Review = { text: reviewText, reviewer: userId };
    } else {
      review.user2Review = { text: reviewText, reviewer: userId };
    }
    await review.save();
    res.json({ message: "Review submitted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error submitting review." });
  }
};

exports.getReview = async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }
    const userId = req.user.userId;
    if (userId !== String(chat.user1) && userId !== String(chat.user2)) {
      return res.status(403).json({ error: "You are not part of this chat." });
    }
    const review = await Review.findOne({ chat: chatId });
    let otherReview = null;
    // If the requester is user1, return user2's review, else return user1's.
    if (userId === String(chat.user1)) {
      otherReview = review ? review.user2Review : null;
    } else {
      otherReview = review ? review.user1Review : null;
    }
    res.json({ review: otherReview });
  } catch (error) {
    res.status(500).json({ error: "Error fetching review." });
  }
};
