// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import cloudinary from "cloudinary";
// import cors from "cors";
// import morgan from "morgan";
// import connectDB from "./db/config";
// import router from "./routes/user";

// const app = express();
// dotenv.config();
// app.use(morgan("dev"));
// app.use(express.json());
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });
// connectDB();

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World with TypeScript!");
// });

// app.use("/api/v1/user", router);

// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/config";
// import router from "./routes/user";
import { Server } from "socket.io";
import http from "http";
import setupRoutes from "./routes/user";
import setupPostRoutes from "./routes/posts";
import setupCommentRoutes from "./routes/comment";
import setupReactionRoutes from "./routes/reaction";

const app = express();
dotenv.config();
app.use(cors());
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

// app.use("/api/v1/user", router);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/api/v1/user", setupRoutes(io));
app.use("/api/v1/post", setupPostRoutes(io));
app.use("/api/v1/comments", setupCommentRoutes(io));
app.use("/api/v1/reaction", setupReactionRoutes(io));

export const connectedUsers = new Map<string, string>();

io.on("connection", (socket) => {
  console.log(`New user connected: ${socket.id}`);

  socket.on("register", (userId: string) => {
    connectedUsers.set(userId, socket.id);
    console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
  });

  socket.on("disconnect", () => {
    connectedUsers.forEach((socketId, userId) => {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        console.log(`User disconnected: ${userId}`);
      }
    });
  });
});

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
