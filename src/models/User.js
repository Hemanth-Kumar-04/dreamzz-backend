const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hash this in production
  userId: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  username: { type: String, required: true, unique: true },
  bio: {
    type: String,
    default: "",
    validate: {
      validator: function (value) {
        return value.length <= 150 && value.split(/\s+/).length <= 30;
      },
      message: "Bio cannot exceed 150 characters or 30 words!",
    },
  },
  profilePic: { type: String,required: true }, 
});

module.exports = mongoose.model("User", UserSchema);
