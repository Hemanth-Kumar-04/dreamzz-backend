// src/routes/reviewRoutes.js
const express = require("express");
const { submitReview, getReview } = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, submitReview);
router.get("/:chatId", authMiddleware, getReview);

module.exports = router;
