const Message = require("../models/Message");

const getMessages = async (req, res) => {
  const { user1, user2 } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { from: user1, to: user2 },
        { from: user2, to: user1 },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const saveMessage = async (req, res) => {
  const { from, to, text } = req.body;

  try {
    const message = await Message.create({ from, to, text });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getMessages, saveMessage };
