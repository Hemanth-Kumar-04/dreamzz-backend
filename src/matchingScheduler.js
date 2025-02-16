// src/matchingScheduler.js
const cron = require("node-cron");
const { findMatch } = require("./utils/matchUsers");
const User = require("./models/User");
const { createChatForMatch } = require("./controllers/chatController");

// This cron expression '*/10 * * * *' means the job runs every 10 minutes.
cron.schedule('*/10 * * * *', async () => {
  console.log("Running matching job every 10 minutes...");
  try {
    const users = await User.find({});
    for (const user of users) {
      try {
        const match = await findMatch(user._id);
        if (match) {
          console.log(`Match found for user ${user.username}:`, match);
          const chat = await createChatForMatch(user._id, match.user._id);
          console.log(`Chat established between ${user.username} and ${match.user.username}. Chat ID: ${chat._id}`);
        } else {
          console.log(`No match found for user ${user.username}.`);
        }
      } catch (matchError) {
        console.error(`Error matching user ${user.username}:`, matchError);
      }
    }
  } catch (err) {
    console.error("Error running the matching job:", err);
  }
});
