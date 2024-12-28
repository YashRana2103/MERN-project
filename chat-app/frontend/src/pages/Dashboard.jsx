// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ userName, onlineUsers, onUserClick }) => {
  return (
    <div className="bg-light-teal min-h-screen flex flex-col p-4">
      <h1 className="text-3xl text-dark-blue font-semibold mb-4">
        Online Users
      </h1>
      <div className="flex-1 overflow-y-auto">
        {onlineUsers.length === 0 ? (
          <p className="text-center text-xl text-black">No users online</p>
        ) : (
          onlineUsers.map((user) => (
            <div
              key={user._id}
              className="bg-dark-blue text-white p-3 rounded-lg mb-4 cursor-pointer hover:bg-light-blue"
              onClick={() => onUserClick(user._id, user.name)}
            >
              {user.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
