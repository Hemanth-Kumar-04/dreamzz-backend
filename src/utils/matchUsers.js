// src/utils/matchUsers.js
const Dream = require("../models/Dream");
const User = require("../models/User");

exports.findMatch = async (userId) => {
  const currentUser = await User.findById(userId);
  if (!currentUser) throw new Error("User not found.");

  // Find dreams from other users with matching tags (this example assumes each user has posted dreams)
  const dreams = await Dream.find({
    user: { $ne: userId },
    tags: { $in: currentUser.dreamTags || [] }
  }).populate("user", "gender");

  const matches = dreams.filter(dream => dream.user.gender !== currentUser.gender);
  return matches.length > 0 ? matches[0] : null;
};
