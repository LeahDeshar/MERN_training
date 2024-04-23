const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const socket = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});

socket.on("connection", (socket) => {
  //   console.log(socket);
  socket.on("MessageReq", (data) => {
    console.log("MessageReq in server", data);
  });
  socket.emit("message", "Hello from server");
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
