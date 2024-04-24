const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
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

  socket.on("createRead", (data) => {
    users?.push({ ...data, id: socket.id });
    socket.emit("crudStores", users);
    setInterval(() => {
      socket.emit("crudStores", users);
    }, 5000);
    console.log(data);
  });

  socket.on("delete", (id) => {
    console.log(id, "server");
    users = users.filter((user) => user.id !== id);
    socket.emit("crudStores", users);
    setInterval(() => {
      socket.emit("crudStores", users);
    }, 5000);
  });

  // Update
  socket.on("update", (updatedUser) => {
    users = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    io.emit("usersUpdated", users);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
