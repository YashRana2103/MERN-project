import React, { useState } from "react";

const Home = ({ onNameSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onNameSubmit(name);
    }
  };

  return (
    <div className="bg-dark-blue min-h-screen flex flex-col justify-center items-center text-white">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to ChatApp</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white text-black p-3 rounded-lg w-full mb-4"
          placeholder="Enter your name"
        />
        <button
          onClick={handleSubmit}
          className="bg-light-blue text-dark-blue px-6 py-3 rounded-lg text-xl transition-all hover:bg-light-teal"
        >
          Enter Chat
        </button>
      </div>
    </div>
  );
};

export default Home;
