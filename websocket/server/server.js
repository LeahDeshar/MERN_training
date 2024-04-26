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
const Cart = require("./models/cartModel");

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

  // Add to cart event
  socket.on("addToCart", async (id) => {
    try {
      console.log(id);
      const product = await Products.findById(id);
      console.log(product);
      if (!product) {
        return socket.emit("addToCartError", "Product not found");
      }
      // Add to cart logic
      // create the cart with the product and quantity
      const cart = new Cart({
        items: [
          {
            product: product._id,
          },
        ],
      });

      cart.totalQuantity += 1;
      cart.totalPrice += product.price;
      await cart.save();

      const AllCart = await Cart.find().populate("items.product");
      socket.emit("readCart", AllCart);
    } catch (error) {
      // Handle errors
      console.log("Error adding to cart:", error);
      socket.emit("addToCartError", "An error occurred while adding to cart");
    }
  });
  socket.on("readFromCart", async () => {
    try {
      const AllCart = await Cart.find().populate("items.product");
      socket.emit("readCart", AllCart);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("removeFromCart", async (id) => {
    try {
      await Cart.findByIdAndDelete(id);
      const AllCart = await Cart.find().populate("items.product");

      socket.emit("removeProduct", AllCart);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  });
});

httpServer.listen(8080, () => {
  console.log("Server is running on port 8080");
});
