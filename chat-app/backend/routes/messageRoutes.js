const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Send a message
router.post("/send", async (req, res) => {
  const { sender, recipient, content } = req.body;

  if (!sender || !recipient || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const message = new Message({ sender, recipient, content });
    await message.save().then(() => console.log("Message saved!"));
    return res.status(201).json(message);
  } catch (err) {
    console.log("Server error while saving message!");
    return res.status(500).json({ error: "Server error while saving message" });
  }
});

// get conversation between two users
router.get("/conversation", async (req, res) => {
  const { user1, user2 } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ createdAt: 1 });
    console.log("Messages fetched!");
    return res.status(200).json({ messages });
  } catch (err) {
    console.log("Server error while fetching messages!");
    return res
      .status(500)
      .json({ error: "Server error while fetching messages!" });
  }
});

module.exports = router;
