const express = require("express");
const { getMessages, saveMessage } = require("../controllers/chatController");

const router = express.Router();

router.get("/messages", getMessages);
router.post("/messages", saveMessage);

module.exports = router;
