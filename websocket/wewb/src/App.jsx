import "./App.css";
import io from "socket.io-client";
import { useEffect } from "react";
import Input from "./components/Input";
function App() {
  const socket = io("http://localhost:3000");

  function connectionSocket() {
    socket.on("connection", (socket) => {
      console.log("client");
      console.log(socket);
    });
  }

  useEffect(() => {
    connectionSocket();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <h1>React Multiplayer DashBoard</h1>
        <Input placeholder={"Enter Your Name"} />
      </div>
    </>
  );
}

export default App;
