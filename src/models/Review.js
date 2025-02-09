// src/models/Review.js
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
  user1Review: {
    text: { type: String, default: "" },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  user2Review: {
    text: { type: String, default: "" },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", ReviewSchema);
