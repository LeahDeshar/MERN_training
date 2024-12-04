import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import connnectDB from "./db/db";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import logger from "./config/logger";
import limiter from "./middleware/rateLimit";
import { initRedisClient } from "./config/redis";
import userRouter from "./routes/user";
export const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

connnectDB();
initRedisClient();
mongoose.connection.on("error", (error) => {
  logger.error(`MongoDB connection error: ${error.message}`);
});

const PORT = process.env.PORT || 8083;

app.get("/", (req, res) => {
  logger.info("Root route accessed");
  res.send("Welcome to the API!");
});

app.use("/api/v1/auth", userRouter);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
