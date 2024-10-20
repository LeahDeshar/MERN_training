import { Request, Response } from "express";
import { Server } from "socket.io";
import Comment from "../models/comment";
import Post from "../models/posts";
import { connectedUsers } from "..";
import User from "../models/user";

// declare module "express-serve-static-core" {
//     interface Request {
//       user?: User;
//       file: Express.Multer.File;
//     }
//   }
//   interface User {
//     _id: string;
//     email: string;
//     password: string;
//     followers: [];
//     following: [];
//     friendRequestsSent: [];
//     friendRequestsReceived: [];
//     friends: [];
//     profilePic?: {
//       public_id?: string;
//       url?: string;
//     };
//   }
export const createCommentController = async (
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

    const { content, postId, parentCommentId } = req.body;
    if (!content || !postId) {
      res
        .status(400)
        .json({ msg: "Content and postId are required", success: false });
      return;
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ msg: "Post not found", success: false });
      return;
    }

    const newComment = new Comment({
      content,
      author: req.user._id,
      post: postId,
      parentComment: parentCommentId || null,
    });

    await newComment.save();

    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: newComment._id },
      });
    }

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    const authorSocketId = connectedUsers.get(post.author.toString());
    if (authorSocketId) {
      io.to(authorSocketId).emit("comment-created", {
        postId,
        comment: newComment,
        message: `Your post has a new comment from ${
          user?.username || req.user.email
        }`,
      });
    }

    res.status(201).json({
      msg: "Comment created successfully",
      success: true,
      comment: newComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({
      msg: "Internal server error",
      success: false,
      error,
    });
  }
};
