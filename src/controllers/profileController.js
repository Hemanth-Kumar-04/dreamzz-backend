const User = require("../models/User");
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
    const { username} = req.params; // Get userId from URL params
    const user = await User.findOne({ username }).select("-password"); // Find by userId

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({
      userId: user.userId,
      username: user.username,
      gender: user.gender,
      bio: user.bio,
      profilePic: user.profilePic,
      posts: user.posts.slice(0, 5), // Max 5 posts
    });
  } catch (error) {
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
