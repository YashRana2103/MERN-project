import React, { useState } from "react";
import { checkOrCreateUser } from "../api/api";

const EnterName = ({ setUsername }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Please enter a name.");

    try {
      const user = await checkOrCreateUser(name);
      setUsername(user.username);
    } catch (error) {
      alert("Error creating user. Try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Enter Your Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EnterName;
