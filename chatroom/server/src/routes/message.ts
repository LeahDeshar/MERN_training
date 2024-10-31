// src/routes/message.ts
import express from "express";
import { Conversation } from "../models/conversation";
import { Message } from "../models/message";

const router = express.Router();

// Start Conversation
router.post("/conversation", async (req, res) => {
  const { participants } = req.body;
  const newConversation = new Conversation({ participants });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    res.status(500).json({ error: "Error creating conversation" });
  }
});

// Send Message
router.post("/:conversationId/message", async (req, res) => {
  const { conversationId } = req.params;
  const { senderId, text } = req.body;
  const newMessage = new Message({ conversationId, senderId, text });

  try {
    const savedMessage = await newMessage.save();
    await Conversation.findByIdAndUpdate(conversationId, {
      $push: { messages: savedMessage._id },
    });
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
});

// Get Conversation Messages
router.get("/:conversationId", async (req, res) => {
  try {
    const conversation = await Conversation.findById(
      req.params.conversationId
    ).populate({
      path: "messages",
      select: "text senderId timestamp",
    });
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Error fetching conversation" });
  }
});

export default router;
