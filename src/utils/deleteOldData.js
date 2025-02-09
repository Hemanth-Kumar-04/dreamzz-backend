// src/utils/deleteOldData.js
const Dream = require("../models/Dream");

exports.deleteOldDreams = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  try {
    const result = await Dream.deleteMany({ createdAt: { $lt: sevenDaysAgo } });
    console.log(`${result.deletedCount} dreams deleted (older than 7 days).`);
  } catch (error) {
    console.error("Error deleting old dreams:", error);
  }
};
