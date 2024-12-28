import React, { useState, useEffect } from "react";
import { getAllUsers, getMessages, saveMessage } from "../api/api";

const Dashboard = ({ username }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers(username);
      setUsers(allUsers);
    };
    fetchUsers();
  }, [username]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser) {
        const msgs = await getMessages(username, selectedUser);
        setMessages(msgs);
      }
    };
    fetchMessages();
  }, [selectedUser, username]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await saveMessage(username, selectedUser, newMessage);
      setMessages([
        ...messages,
        { from: username, to: selectedUser, text: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <h1>Welcome, {username}</h1>
      <div>
        <h2>Online Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} onClick={() => setSelectedUser(user.username)}>
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selectedUser ? (
          <>
            <h2>Chat with {selectedUser}</h2>
            <div>
              {messages.map((msg, index) => (
                <p
                  key={index}
                  style={{
                    textAlign: msg.from === username ? "right" : "left",
                  }}
                >
                  <strong>{msg.from}:</strong> {msg.text}
                </p>
              ))}
            </div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
