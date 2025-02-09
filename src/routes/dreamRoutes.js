// src/routes/dreamRoutes.js
const express = require("express");
const { postDream, getDreams } = require("../controllers/dreamController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, postDream);
router.get("/", authMiddleware, getDreams);

module.exports = router;
