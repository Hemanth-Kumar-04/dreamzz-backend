const Chat = require("../models/Chat");

exports.createChat = async (req, res) => {
  const { userId } = req.user;  // Authenticated user
  const { recipientId } = req.body;  // Person to chat with

  try {
    // Check if a chat already exists
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

    // Creates a new chat
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

// Send message in an existing chat
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
