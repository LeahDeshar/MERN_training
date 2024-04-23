// client socket
const socket = io("http://localhost:3000");

socket.on("connect", (response) => {
  console.log("Connected to server", response);
});

socket.on("message", (data) => {
  console.log("Message in client", data);
});

socket.emit("MessageReq", "Hello from client");
