const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ChatSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  messages: [MessageSchema],
  isActive: { type: Boolean, default: true }, // Tracks active chat status
  createdAt: { type: Date, default: Date.now, index: { expires: "24h" } }
});

// Ensure that only one chat exists per match
ChatSchema.index({ user1: 1, user2: 1 }, { unique: true });

module.exports = mongoose.model("Chat", ChatSchema);
