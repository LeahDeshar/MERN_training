// src/models/Message.ts
import { Schema, model, Types } from "mongoose";

interface IMessage {
  conversationId: Types.ObjectId;
  senderId: Types.ObjectId;
  text: string;
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Message = model<IMessage>("Message", messageSchema);
