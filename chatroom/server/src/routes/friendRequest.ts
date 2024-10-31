// src/routes/friendRequest.ts
import express from "express";
import { FriendRequest } from "../models/friendRequest";
import User from "../models/user";
const router = express.Router();

// Send Friend Request
router.post("/send", async (req, res) => {
  const { senderId, receiverId } = req.body;

  const newRequest = new FriendRequest({ senderId, receiverId });

  try {
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ error: "Error sending friend request" });
  }
});

// Accept Friend Request
router.post("/:id/accept", async (req, res) => {
  try {
    const friendRequest = await FriendRequest.findByIdAndUpdate(req.params.id, {
      status: "accepted",
    });
    if (friendRequest) {
      await User.findByIdAndUpdate(friendRequest.senderId, {
        $push: { friends: friendRequest.receiverId },
      });
      await User.findByIdAndUpdate(friendRequest.receiverId, {
        $push: { friends: friendRequest.senderId },
      });
      res.json({ message: "Friend request accepted" });
    } else {
      res.status(404).json({ error: "Friend request not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error accepting friend request" });
  }
});

// Decline Friend Request
router.post("/:id/decline", async (req, res) => {
  try {
    await FriendRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Friend request declined" });
  } catch (error) {
    res.status(500).json({ error: "Error declining friend request" });
  }
});

export default router;
