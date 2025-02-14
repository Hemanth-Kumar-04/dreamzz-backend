const Post = require("../models/Post");
const User = require("../models/User");

exports.addPost = async (req, res) => {
  const { postImage, caption } = req.body; // Image URL or base64
  const userId = req.user.userId; // Get user ID from auth middleware

  if (!postImage) {
    return res.status(400).json({ error: "Post image is required." });
  }

  try {
    const postCount = await Post.countDocuments({ userId });

    if (postCount >= 5) {
      return res.status(400).json({ error: "You can only have 5 posts." });
    }

    const newPost = new Post({ userId, image: postImage, caption });
    await newPost.save();

    res.status(201).json({ message: "Post added successfully.", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "Error adding post." });
  }
};
exports.deletePost = async (req, res) => {
    const { postId } = req.params; // Get post ID from request params
    const userId = req.user.userId; // Get user ID from auth middleware
  
    try {
      const post = await Post.findOne({ _id: postId, userId });
  
      if (!post) {
        return res.status(404).json({ error: "Post not found or unauthorized." });
      }
  
      await Post.findByIdAndDelete(postId);
  
      res.json({ message: "Post deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Error deleting post." });
    }
  };
  