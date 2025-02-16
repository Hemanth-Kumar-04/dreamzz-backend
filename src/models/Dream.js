// src/models/Dream.js
const mongoose = require("mongoose");

const DreamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }], // Controller will enforce a maximum of 2 tags
  bookmark: { type: Boolean, default: false },
},  { timestamps: true } );

module.exports = mongoose.model("Dream", DreamSchema);
