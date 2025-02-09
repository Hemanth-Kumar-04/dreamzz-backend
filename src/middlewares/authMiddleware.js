// src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided or invalid format." });
  }

  // Extract only the token part (after "Bearer ")
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Failed to authenticate token." });

    req.user = { userId: decoded.userId };
    next();
  });
};
