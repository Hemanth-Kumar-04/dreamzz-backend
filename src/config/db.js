const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true, // Ensures SSL connection if needed
      tlsAllowInvalidCertificates: true, // Allows invalid SSL certificates (for testing)
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
