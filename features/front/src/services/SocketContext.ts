// src/context/SocketContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ userId, children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (userId) {
      // Establish a socket connection
      const newSocket = io("http://localhost:8080/", {
        query: { userId },
      });

      newSocket.emit("register", userId); // Register the user with the server

      setSocket(newSocket);

      // Clean up the socket connection when the component unmounts
      return () => {
        newSocket.disconnect();
      };
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
