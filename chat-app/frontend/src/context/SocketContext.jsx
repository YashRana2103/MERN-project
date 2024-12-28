import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io("http://localhost:5000");
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
