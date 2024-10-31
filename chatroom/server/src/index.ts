import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/config";
import { Server } from "socket.io";
import http from "http";
import setupRoutes from "./routes/user";
import setupPostRoutes from "./routes/posts";
import setupCommentRoutes from "./routes/comment";
import setupReactionRoutes from "./routes/reaction";
import messageRoutes from "./routes/message";
import friendRequestRoutes from "./routes/friendRequest";
import { Message } from "./models/message";
import { Conversation } from "./models/conversation";

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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/api/v1/user", setupRoutes(io));
app.use("/api/messages", messageRoutes);
app.use("/api/friends", friendRequestRoutes);

app.use("/api/v1/post", setupPostRoutes(io));
app.use("/api/v1/comments", setupCommentRoutes(io));
app.use("/api/v1/reaction", setupReactionRoutes(io));

export const connectedUsers = new Map<string, string>();

import { Document, Types } from "mongoose";

interface IConversation extends Document {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
  createdAt?: Date;
}

// for IC

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join user's personal room based on their ID
  socket.on("join", async (userId: string, otherId: string) => {
    socket.join(userId);
    console.log(`User ${userId} and ${otherId} joined their room`);

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, otherId] },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, otherId],
      });
      console.log(`New conversation created between ${userId} and ${otherId}`);
    } else {
      console.log(
        `Conversation already exists between ${userId} and ${otherId}`
      );
    }

    socket.emit("conversationId", conversation._id);

    socket.on("allMessageOfUser", async ({ conversationId }) => {
      try {
        // Fetch all messages for the given conversation ID
        const messages = await Message.find({ conversationId }).populate(
          "senderId",
          "username profilePic"
        );

        // Emit the messages back to the client
        socket.emit("receiveMessages", { conversationId, messages });
      } catch (error) {
        console.error("Error retrieving messages:", error);
        socket.emit("error", { message: "Failed to retrieve messages." });
      }
    });
  });

  // socket.on("sendMessage", async ({ conversationId, senderId, text }) => {
  //   const filteredGroup = (await Conversation.findOne({
  //     _id: conversationId,
  //   })) as IConversation;
  //   if (filteredGroup) {
  //     const newMessage = new Message({ conversationId, senderId, text });
  //     await newMessage.save();

  //     filteredGroup.messages.push(newMessage._id);
  //     await filteredGroup.save();
  //   } else {
  //     console.error(`Group with ID ${conversationId} not found`);
  //   }
  // });

  socket.on("sendMessage", async ({ conversationId, senderId, text }) => {
    const filteredGroup = await Conversation.findOne({
      _id: conversationId,
    });

    if (filteredGroup) {
      const newMessage = new Message({ conversationId, senderId, text });
      await newMessage.save();

      filteredGroup.messages.push(newMessage._id);
      await filteredGroup.save();

      // Broadcast the message to all users in the conversation
      socket
        .to(
          filteredGroup.participants.map((participant) =>
            participant.toString()
          )
        )
        .emit("receiveMessages", {
          conversationId,
          messages: [newMessage],
        });
    } else {
      console.error(`Group with ID ${conversationId} not found`);
    }
  });

  socket.on("allMessageOfUser", async ({ conversationId }) => {
    try {
      // Fetch all messages for the given conversation ID
      const messages = await Message.find({ conversationId }).populate(
        "senderId",
        "username role profilePic"
      );

      console.log("messanges sent ");

      // Emit the messages back to the client
      socket.emit("receiveMessages", { conversationId, messages });
    } catch (error) {
      console.error("Error retrieving messages:", error);
      socket.emit("error", { message: "Failed to retrieve messages." });
    }
  });
  // Disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 8082;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
