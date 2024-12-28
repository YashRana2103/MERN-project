const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

// Models
const User = require("./models/User");
const Message = require("./models/Message");

const app = express();
app.use(cors());
app.use(express.json());

// routes
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("user-online", async (userID) => {
    console.log(`User online: ${userID}`);
    await User.findByIdAndUpdate(userID, { isOnline: true });
    const onlineUsers = await User.find({ isOnline: true });
    io.emit("online-users", onlineUsers);
  });

  socket.on("send-message", async ({ sender, recipient, content }) => {
    const message = new Message({ sender, recipient, content });
    await message.save();
    io.to(recipient).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
  });
});

// app.get("/", (req, res) => {
//   res.send("Chat app backend is running!");
// });

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
