// src/models/FriendRequest.ts
import { Schema, model, Types } from "mongoose";

interface IFriendRequest {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  status: "pending" | "accepted" | "declined";
  createdAt?: Date;
}

const friendRequestSchema = new Schema<IFriendRequest>({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const FriendRequest = model<IFriendRequest>(
  "FriendRequest",
  friendRequestSchema
);
