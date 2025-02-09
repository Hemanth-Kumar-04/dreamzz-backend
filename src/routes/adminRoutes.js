// src/routes/adminRoutes.js
const express = require("express");
const { getStats } = require("../controllers/adminController");
const router = express.Router();

// Optionally protect admin routes with extra middleware
router.get("/stats", getStats);

module.exports = router;
