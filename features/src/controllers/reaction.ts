import { Request, Response } from "express";
import { Server } from "socket.io";
import Reaction from "../models/reaction";
import Post from "../models/posts";
import Comment from "../models/comment";
import { connectedUsers } from "..";
import User from "../models/user";

export const createReactionController = async (
  req: Request,
  res: Response,
  io: Server
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ msg: "Unauthorized", success: false });
      return;
    }
    const user = await User.findById(req.user._id);

    const { type, postId, commentId } = req.body;
    if (!type || (!postId && !commentId)) {
      res.status(400).json({
        msg: "Reaction type and either postId or commentId are required",
        success: false,
      });
      return;
    }

    // Validate that the reaction type is within the allowed set
    const allowedReactions = ["like", "love", "haha", "wow", "sad", "angry"];
    if (!allowedReactions.includes(type)) {
      res.status(400).json({ msg: "Invalid reaction type", success: false });
      return;
    }

    const newReaction = new Reaction({
      type,
      user: req.user._id,
      post: postId || null,
      comment: commentId || null,
    });

    await newReaction.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { likes: newReaction._id },
    });
    let targetUserId = null;

    if (postId) {
      const post = await Post.findById(postId);
      if (post) {
        targetUserId = post.author;
      }
    } else if (commentId) {
      const comment = await Comment.findById(commentId);
      if (comment) {
        targetUserId = comment.author;
      }
    }

    // Notify the author of the post or comment about the new reaction
    if (targetUserId) {
      const targetSocketId = connectedUsers.get(targetUserId.toString());
      if (targetSocketId) {
        io.to(targetSocketId).emit("reaction-added", {
          user: req.user._id,
          reaction: newReaction,
          message: `Your post/comment received a ${type} reaction from ${
            user?.username || req.user.email
          }`,
        });
      }
    }

    res.status(201).json({
      msg: "Reaction added successfully",
      success: true,
      reaction: newReaction,
    });
  } catch (error) {
    console.error("Error creating reaction:", error);
    res.status(500).json({
      msg: "Internal server error",
      success: false,
      error,
    });
  }
};
