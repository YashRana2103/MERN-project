const express = require("express");
const User = require("../models/User");
const Message = require("../models/Message");
const router = express.Router();

// Send a message
router.post("/send", async (req, res) => {
  console.log("Saving message...");

  const { sender, recipient, content } = req.body;

  if (!sender || !recipient || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if sender and recipient are valid users
    const senderUser = await User.findById(sender);
    const recipientUser = await User.findById(recipient);

    if (!senderUser || !recipientUser) {
      console.log("Invalid sender or recipient!");
      return res.status(400).json({ error: "Invalid sender or recipient" });
    }

    // Create a new message and save it
    const message = new Message({ sender, recipient, content });
    await message.save();
    console.log("Message saved!\n");

    // Emit message to the recipient via Socket.IO (you should integrate socket logic here)
    // io.to(recipient).emit("receive-message", message); // Uncomment when socket.io is used

    return res.status(201).json(message);
  } catch (err) {
    console.log("Server error while saving message: ", err);
    return res.status(500).json({ error: "Server error while saving message" });
  }
});

// Get conversation between two users
router.get("/conversation", async (req, res) => {
  const { user1, user2 } = req.query;

  console.log("Getting conversation between two users...");

  if (!user1 || !user2) {
    console.log("Both user IDs are required\n");

    return res.status(400).json({ error: "Both user IDs are required" });
  }

  try {
    // console.log("User1 ID:", user1);
    // console.log("User2 ID:", user2);

    // Check if both users exist before querying messages
    const senderUser = await User.findById(user1);
    const recipientUser = await User.findById(user2);

    if (!senderUser || !recipientUser) {
      console.log("Invalid sender or recipient!\n");
      return res.status(400).json({ error: "Invalid sender or recipient" });
    }

    console.log("Fetching messages...");

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ createdAt: 1 });

    console.log("Messages fetched!\n");
    // console.log("Fetched messages:", messages);

    return res.status(200).json({ messages });
  } catch (err) {
    console.log("Server error while fetching messages: ", err, "\n");
    return res
      .status(500)
      .json({ error: "Server error while fetching messages!" });
  }
});

module.exports = router;
