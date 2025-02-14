const User = require("../models/User");
const Post = require("../models/Post");

//get own profile!! 
const viewProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({
      email: user.email,
      userId: user.userId,
      username: user.username,
      gender: user.gender,
      bio: user.bio,
      profilePic: user.profilePic,
      posts: user.posts.slice(0, 5), // Ensure max 5 posts are returned
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user profile." });
  }
};

//get others profile

const viewOtherUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const posts = await Post.find({ userId: user._id }).limit(5);

    res.json({
      userId: user.userId,
      username: user.username,
      gender: user.gender,
      bio: user.bio,
      profilePic: user.profilePic,
      posts: posts,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Error fetching user profile." });
  }
};

//update own Profile
const updateProfile = async (req, res) => {
  const { bio, profilePic } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId, 
      { 
        bio: bio || "", 
        profilePic: profilePic || "" 
      }, 
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "Profile updated successfully.", user });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile." });
  }
};


 // This should not log 'undefined'
 module.exports = {
  viewProfile,
  updateProfile,
  viewOtherUserProfile,
};
