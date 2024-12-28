import React from "react";

const MessageList = ({ messages }) => {
  return (
    <div className="message-list p-4 bg-dark-blue rounded-lg max-h-96 overflow-y-scroll">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className="message p-2 mb-2 bg-light-teal rounded-lg"
        >
          <p>
            <strong>{msg.sender.name}: </strong>
            {msg.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
