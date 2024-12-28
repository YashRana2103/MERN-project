// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";

const App = () => {
  const [userName, setUserName] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle name submission (first screen)
  const handleNameSubmit = (name) => {
    setUserName(name);
    // Simulate online users
    setOnlineUsers([
      { _id: "1", name: "Alice" },
      { _id: "2", name: "Bob" },
    ]);
  };

  // Handle selecting a user (go to chat screen)
  const handleUserClick = (userId, userName) => {
    setSelectedUser(userName);
    setMessages([
      { sender: "me", content: "Hello!" },
      { sender: userName, content: "Hi there!" },
    ]);
  };

  // Handle sending a message
  const handleSendMessage = (content) => {
    setMessages((prevMessages) => [...prevMessages, { sender: "me", content }]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onNameSubmit={handleNameSubmit} />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              userName={userName}
              onlineUsers={onlineUsers}
              onUserClick={handleUserClick}
            />
          }
        />
        <Route
          path="/chat"
          element={
            <Chat
              selectedUser={selectedUser}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
