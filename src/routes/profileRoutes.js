const express = require("express");
const { viewProfile, updateProfile, viewOtherUserProfile } = require("../controllers/profileController");

const authMiddleware = require("../middlewares/authMiddleware"); // Middleware for protected routes

const router = express.Router();

// Protected routes (require authentication)//testuser3//testuser03
router.get("/profile", authMiddleware, viewProfile); // View own profile
router.put("/profile", authMiddleware, updateProfile); // Update own profile
router.get("/profile/:username", viewOtherUserProfile);

module.exports = router;
