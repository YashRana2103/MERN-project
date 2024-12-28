const express = require("express");
const User = require("../models/User");
const { log } = require("console");
const router = express.Router();

// register or log in a user
router.post("/login", async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Name is required" });

  try {
    let user = await User.findOne({ name });
    if (!user) {
      user = new User({ name, isOnline: true });
      await user
        .save()
        .then(() => console.log("New User added and Set to online!"));
    } else {
      user.isOnline = true;
      await user.save().then(() => console.log("User set to online!"));
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log("Server error while logging the user!");
    return res
      .status(500)
      .json({ error: "Server error while logging the user" });
  }
});

//get all online users
router.get("/online", async (req, res) => {
  try {
    const users = User.find({ isOnline: true });
    console.log("Online users fetched!");
    return res.status(200).json(users);
  } catch (err) {
    console.log("Server error while fetching online users!");
    return res
      .status(500)
      .json({ error: "Server error while fetching online users" });
  }
});

//update user status
router.post("/logout", async (req, res) => {
  const { name } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { name },
      { isOnline: false }
    ).then(() => console.log("User logged out!"));
    if (user) return res.status(200).json({ message: "User logged out" });
    return res.status(400).json({ error: "User not found" });
  } catch (err) {
    console.log("Server error while logging out user!");
    return res
      .status(500)
      .json({ error: "Server error while logging out user" });
  }
});

module.exports = router;
