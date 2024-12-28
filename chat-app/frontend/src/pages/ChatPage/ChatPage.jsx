import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import MessageList from "../../components/Chat/MessageList";
import MessageBox from "../../components/Chat/MessageBox";

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { userId } = useParams(); // Get the recipient user ID from URL
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    // Fetch chat history between users
    axios
      .get(`/api/messages/conversation?user1=${user._id}&user2=${userId}`)
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((err) => console.error("Error fetching conversation:", err));

    socket.emit("join-chat", { sender: user._id, recipient: userId });

    return () => {
      socket.emit("leave-chat", { sender: user._id, recipient: userId });
    };
  }, [user._id, userId, socket]);

  const handleSendMessage = () => {
    if (messageContent) {
      socket.emit("send-message", {
        sender: user._id,
        recipient: userId,
        content: messageContent,
      });
      setMessageContent("");
    }
  };

  return (
    <div className="chat-page p-4">
      <MessageList messages={messages} />
      <MessageBox
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default ChatPage;
