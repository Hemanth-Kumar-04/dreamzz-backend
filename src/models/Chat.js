// src/models/Chat.js
const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      message: { type: String, required: true },
      sentAt: { type: Date, default: Date.now }
    }
  ],
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Chat", ChatSchema);
