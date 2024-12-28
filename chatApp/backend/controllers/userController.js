const User = require("../models/User");

const checkOrCreateUser = async (req, res) => {
  try {
    const { username } = req.body;

    // Validate the input
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    // Step 1: Check if the user already exists
    const existingUser = await User.find({ username }).exec();

    // Step 2: If user exists, return the existing user
    if (existingUser.length > 0) {
      return res.status(200).json(existingUser[0]); // Return the first matching user
    }

    // Step 3: If user doesn't exist, create a new user
    const newUser = new User({ username });
    await newUser.save();

    // Step 4: Return the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error in checkOrCreateUser:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getAllUsers = async (req, res) => {
  const { currentUsername } = req.query;

  try {
    const users = await User.find({ username: { $ne: currentUsername } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { checkOrCreateUser, getAllUsers };
