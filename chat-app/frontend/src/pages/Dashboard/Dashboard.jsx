import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import UserItem from "../../components/UserList/UserItem";

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Get current logged-in user
  const { socket } = useContext(SocketContext); // Get socket context
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Fetch online users
    axios
      .get("/api/users/online")
      .then((response) => {
        setOnlineUsers(response.data);
      })
      .catch((err) => console.error("Error fetching online users:", err));

    socket.emit("user-online", user._id); // Inform socket server about the logged-in user

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("online-users");
    };
  }, [socket, user]);

  return (
    <div className="dashboard-container p-4">
      <h2 className="text-light-blue text-2xl">Online Users</h2>
      <div className="user-list mt-4">
        {onlineUsers.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
