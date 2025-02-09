const express = require("express");
const cors = require("cors"); // Import CORS
const connectDB = require("./config/db");
const cron = require("node-cron");
const { deleteOldDreams } = require("./utils/deleteOldData");
const authRoutes = require("./routes/authRoutes");
const dreamRoutes = require("./routes/dreamRoutes");
const chatRoutes = require("./routes/chatRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS for frontend requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/dreams", dreamRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

// Global error handler
app.use(errorHandler);

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

// Schedule a cron job to delete dreams older than 7 days (runs daily at midnight)
cron.schedule("0 0 * * *", () => {
  console.log("Running scheduled job to delete old dreams...");
  deleteOldDreams();
});

// Start the WebSocket server (this file runs its own server)
require("./ws/chatWS");
  