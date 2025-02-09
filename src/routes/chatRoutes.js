const express = require("express");
const { createChat, addMessage } = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createChat);
router.post("/message", authMiddleware, addMessage);
router.get("/active/:chatId", authMiddleware, async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat || !chat.isActive) {
      return res.status(404).json({ active: false });
    }
    res.status(200).json({ active: true });
  } catch (error) {
    res.status(500).json({ error: "Error checking chat status." });
  }
});

module.exports = router;
