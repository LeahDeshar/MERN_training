const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const socket = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

socket.on("connection", (socket) => {
  //   console.log(socket);
  console.log("connected");
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
