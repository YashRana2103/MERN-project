import React, { useState } from "react";
import EnterName from "./components/EnterName";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [username, setUsername] = useState("");

  return (
    <div>
      {username ? (
        <Dashboard username={username} />
      ) : (
        <EnterName setUsername={setUsername} />
      )}
    </div>
  );
};

export default App;
