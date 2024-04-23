import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Input from "./components/Input";
function App() {
  const [score, setScore] = useState({});
  const socket = io("http://localhost:3000");

  function connectionSocket() {
    socket.on("connection", (socket) => {
      console.log("client");
      console.log(socket);
    });
  }

  function handleInput(event) {
    let { name, value } = event.target;
    let currObj = { [name]: value };
    setScore((prev) => ({ ...prev, ...currObj }));
    console.log(score);
  }
  useEffect(() => {
    connectionSocket();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <h1>React Multiplayer DashBoard</h1>
        <Input
          name="name"
          placeholder={"Enter Your Name"}
          handleInput={handleInput}
        />
        <Input
          name="score"
          placeholder={"Enter Your Score"}
          handleInput={handleInput}
        />
      </div>
    </>
  );
}

export default App;
