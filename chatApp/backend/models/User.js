const mongoose = require("mongoose");

// Create schema for user
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true }, // Ensure unique constraint here
});

const User = mongoose.model("User", userSchema);

module.exports = User;
