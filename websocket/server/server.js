const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let scores = [];
let users = [];

io.on("connection", (socket) => {
  //   console.log(socket);
  console.log("connected");

  socket.on("score", (data) => {
    scores?.push({ ...data, id: socket.id });

    socket.emit("playStores", scores);

    setInterval(() => {
      socket.emit("playStores", scores);
    }, 5000);

    console.log(scores);
  });

  socket.on("crud", (data) => {
    users?.push({ ...data, id: socket.id });
    socket.emit("crudStores", users);
    setInterval(() => {
      socket.emit("crudStores", users);
    }, 5000);
    console.log(data);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
