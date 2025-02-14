const express = require("express");
const { addPost, deletePost } = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addPost);
router.delete("/delete/:postId", authMiddleware, deletePost);

module.exports = router;
