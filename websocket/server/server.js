const express = require("express");
const { mongoose } = require("mongoose");
const { connectDB } = require("./db/config");
const morgan = require("morgan");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const fileRouter = require("./routes/fileRoutes");
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

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1/image", fileRouter);
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
