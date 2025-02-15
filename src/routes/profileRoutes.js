const express = require("express");
const { viewProfile, updateProfile, viewOtherUserProfile } = require("../controllers/profileController");

const authMiddleware = require("../middlewares/authMiddleware"); // Middleware for protected routes

const router = express.Router();


router.get("/profile", authMiddleware, viewProfile); // View own profile
router.put("/profile", authMiddleware, updateProfile); // Update own profile
router.get("/profile/:username", viewOtherUserProfile);//View other user profile

module.exports = router;
