const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { mongoose } = require("mongoose");
const { connectDB } = require("./db/config");
const morgan = require("morgan");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const productRouter = require("./routes/productRoutes");

const Products = require("./models/productModel");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

connectDB();
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "UPDATE"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/v1/products", productRouter);

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("getAll", async () => {
    try {
      const products = await Products.find();
      socket.emit("read", products);
    } catch (error) {
      console.log(error);
    }
  });
});

httpServer.listen(8080, () => {
  console.log("Server is running on port 8080");
});
