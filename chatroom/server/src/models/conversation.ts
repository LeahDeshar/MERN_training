// src/models/Conversation.ts
import { Schema, model, Types } from "mongoose";

interface IConversation {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
  createdAt?: Date;
}

const conversationSchema = new Schema<IConversation>({
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  createdAt: { type: Date, default: Date.now },
});

export const Conversation = model<IConversation>(
  "Conversation",
  conversationSchema
);
