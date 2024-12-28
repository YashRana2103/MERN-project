// src/pages/Chat.jsx
import React, { useState, useEffect } from "react";

const Chat = ({ selectedUser, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="bg-light-teal min-h-screen flex flex-col">
      <div className="bg-dark-blue text-white p-4">
        <h1 className="text-2xl font-semibold">{selectedUser}</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-4 rounded-lg ${
              msg.sender === "me"
                ? "bg-light-blue text-black"
                : "bg-white text-black"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="p-4 bg-dark-blue">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 rounded-lg mb-2"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-light-blue text-dark-blue py-2 px-6 rounded-lg w-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
