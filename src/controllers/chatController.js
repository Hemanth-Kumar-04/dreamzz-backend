// src/controllers/chatController.js
const Chat = require("../models/Chat");

// Create chat via API (HTTP endpoint)
exports.createChat = async (req, res) => {
  const { userId } = req.user; // Authenticated user
  const { recipientId } = req.body; // Person to chat with

  try {
    // Check if an active chat already exists between these users
    let chat = await Chat.findOne({
      $or: [
        { user1: userId, user2: recipientId },
        { user1: recipientId, user2: userId }
      ],
      isActive: true
    });

    if (chat) {
      return res.status(200).json({ message: "Chat already exists.", chatId: chat._id });
    }

    // Create a new chat
    chat = new Chat({
      user1: userId,
      user2: recipientId,
      messages: [],
      isActive: true
    });

    await chat.save();
    res.status(201).json({ message: "Chat created successfully.", chatId: chat._id });

  } catch (error) {
    res.status(500).json({ error: "Error creating chat." });
  }
};

// Internal function: Create chat automatically between two users (for matching)
exports.createChatForMatch = async (user1, user2) => {
  // Check if an active chat already exists between these users
  let chat = await Chat.findOne({
    $or: [
      { user1: user1, user2: user2 },
      { user1: user2, user2: user1 }
    ],
    isActive: true
  });

  if (chat) {
    return chat;
  }

  // Create a new chat
  chat = new Chat({
    user1,
    user2,
    messages: [],
    isActive: true
  });

  await chat.save();
  return chat;
};

// Send message in an existing chat via API
exports.addMessage = async (req, res) => {
  const { chatId, message } = req.body;
  const { userId } = req.user;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat || !chat.isActive) {
      return res.status(400).json({ error: "Chat does not exist or is inactive." });
    }

    chat.messages.push({ sender: userId, message });
    await chat.save();

    res.status(200).json({ message: "Message sent successfully." });

  } catch (error) {
    res.status(500).json({ error: "Error sending message." });
  }
};
