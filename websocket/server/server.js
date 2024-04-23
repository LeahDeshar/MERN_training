const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const socket = new Server(httpServer, {});

socket.on("connection", (socket) => {
  console.log("A user connected");
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
