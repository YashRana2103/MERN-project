import React from "react";
// import { useHistory } from "react-router-dom";

const UserItem = ({ user }) => {
  //   const history = useHistory();

  const handleClick = () => {
    history.push(`/chat/${user._id}`); // Redirect to chat page with user ID
  };

  return (
    <div
      className="user-item p-3 bg-dark-blue rounded mb-2 cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-light-teal">{user.name}</p>
    </div>
  );
};

export default UserItem;
