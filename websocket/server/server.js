const { createServer } = require("http");
const { Server } = require("socket.io");
const { mongoose } = require("mongoose");
const User = require("./models/user");

// Connect to MongoDB
async function connection() {
  try {
    await mongoose.connect(
      "mongodb+srv://leahdesar:YIQsgaVrZBJhGUIL@cluster0.cnco2vy.mongodb.net/crudSocket"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}
connection();
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "UPDATE"],
  },
});

let scores = [];
// let users = [];

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

  socket.on("createRead", async (data) => {
    try {
      const user = new User(data);
      await user.save();
      const allUsers = await User.find();
      console.log("new user created", allUsers);

      // users?.push({ ...data, id: socket.id });

      socket.emit("crudStores", allUsers);

      // setInterval(() => {
      //   socket.emit("crudStores", allUsers);
      // }, 5000);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  });

  socket.on("delete", async (id) => {
    console.log(id, "server");
    try {
      await User.findByIdAndDelete(id);
      const allUsers = await User.find();

      socket.emit("crudStores", allUsers);
      // setInterval(() => {
      //   socket.emit("crudStores", allUsers);
      // }, 5000);
      console.log("User deleted with id:", id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    // users = users.filter((user) => user._id !== id);
    // socket.emit("crudStores", users);
    // setInterval(() => {
    //   socket.emit("crudStores", users);
    // }, 5000);
  });

  // Update
  socket.on("update", async (updatedUser) => {
    console.log(updatedUser);
    // update in db
    try {
      await User.findByIdAndUpdate(updatedUser._id, updatedUser);
      // users = users.map((user) =>
      //   user.id === updatedUser.id ? updatedUser.toJSON() : user
      // );

      const allUsers = await User.find();
      io.emit("crudStores", allUsers);
      setInterval(() => {
        socket.emit("crudStores", allUsers);
      }, 5000);
      console.log("User updated:", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  });
});

httpServer.listen(8080, () => {
  console.log("Server is running on port 8080");
});
