const express = require("express");
const User = require("../models/User");
const router = express.Router();

// register or log in a user
router.post("/login", async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });

  try {
    console.log("Adding user or setting user to online...");

    let user = await User.findOne({ name });
    if (user) {
      console.log("Name is already taken!\n");
      return res.status(400).json({ error: "Name is already taken" });
    } else if (!user) {
      console.log("Adding new user...");
      user = new User({ name, isOnline: true });
      await user.save();
      console.log("New User added and Set to online!\n");
    } else {
      console.log("Setting user to online...");
      user.isOnline = true;
      await user.save();
      console.log("User set to online!\n");
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log("Server error while logging the user!\n");
    return res
      .status(500)
      .json({ error: "Server error while logging the user" });
  }
});

//get all online users
router.get("/online", async (req, res) => {
  try {
    console.log("Fetching online users...");
    const users = await User.find({ isOnline: true });
    console.log("Online users fetched!\n");
    return res.status(200).json(users);
  } catch (err) {
    console.log("Server error while fetching online users!\n");
    return res
      .status(500)
      .json({ error: "Server error while fetching online users" });
  }
});

//update user status
router.post("/logout", async (req, res) => {
  const { name } = req.body;
  try {
    console.log("Finding user and updating...");
    const user = await User.findOneAndUpdate({ name }, { isOnline: false });
    if (user) {
      console.log("User logged out!\n");
      return res.status(200).json({ message: "User logged out" });
    }
    console.log("User not found!\n");
    return res.status(400).json({ error: "User not found" });
  } catch (err) {
    console.log("Server error while logging out user!\n");
    return res
      .status(500)
      .json({ error: "Server error while logging out user" });
  }
});

module.exports = router;
