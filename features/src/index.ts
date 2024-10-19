import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/config";
import router from "./routes/user";

const app = express();
dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World with TypeScript!");
});

app.use("/api/v1/user", router);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
