// src/utils/matchUsers.js
const Dream = require("../models/Dream");
const User = require("../models/User");

exports.findMatch = async (userId) => {
  const currentUser = await User.findById(userId);
  if (!currentUser) {
    console.error("User not found for matching.");
    return null;
  }

  // Get all dreams posted by the current user
  const userDreams = await Dream.find({ user: userId });
  const userTags = userDreams.reduce((acc, dream) => {
    dream.tags.forEach(tag => {
      if (!acc.includes(tag)) acc.push(tag);
    });
    return acc;
  }, []);

  if (userTags.length === 0) {
    console.warn(`No dream tags found for current user ${currentUser.username}.`);
    return null;
  }

  // Calculate the timestamp for 24 hours ago
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Find dreams from other users with matching tags that are at least 24 hours old.
  const dreams = await Dream.find({
    user: { $ne: userId },
    tags: { $in: userTags },
    createdAt: { $lte: twentyFourHoursAgo }
  }).populate("user", "gender username");

  if (!dreams || dreams.length === 0) {
    console.warn(`No dreams from other users found with matching tags for ${currentUser.username}.`);
    return null;
  }

  // Filter dreams so that matched users are of the opposite gender.
  const matches = dreams.filter(dream => {
    // Ensure dream.user exists
    if (!dream.user) return false;
    return dream.user.gender !== currentUser.gender;
  });

  if (matches.length === 0) {
    console.warn(`No matches found for user ${currentUser.username} with opposite gender.`);
    return null;
  }

  // Return the first matched dream
  return matches[0];
};
