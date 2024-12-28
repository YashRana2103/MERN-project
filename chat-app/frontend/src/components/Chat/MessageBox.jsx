import React from "react";

const MessageBox = ({ messageContent, setMessageContent, onSend }) => {
  return (
    <div className="message-box mt-4">
      <input
        type="text"
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        className="w-full p-2 rounded bg-light-teal text-black"
        placeholder="Type a message..."
      />
      <button
        onClick={onSend}
        className="mt-2 p-2 bg-light-blue text-white rounded w-full"
      >
        Send
      </button>
    </div>
  );
};

export default MessageBox;
