import { Request, RequestHandler, Response } from "express";
import Users from "../models/user";
import { getDataUri } from "../utils/features";
import cloudinary from "cloudinary";
import mongoose, { Types } from "mongoose";
import Post from "../models/posts";
import { Server } from "socket.io";
import { connectedUsers } from "..";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
    file: Express.Multer.File;
  }
}
interface User {
  _id: string;
  email: string;
  password: string;
  followers: [];
  following: [];
  friendRequestsSent: [];
  friendRequestsReceived: [];
  friends: [];
  profilePic?: {
    public_id?: string;
    url?: string;
  };
}

export const createPostController = async (
  req: Request,
  res: Response,
  io: Server
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(400).json({
        msg: "request body not send",
        success: false,
      });
      return;
    }
    const { content, title } = req.body;
    if (!content && !title) {
      res.status(400).json({ msg: "All fields are required", success: false });
      return;
    }
    const author = req.user._id;

    const file = getDataUri(req.file);
    let postImage = { public_id: "", url: "" };
    if (!file.content) {
      res.status(400).json({
        msg: "No file content provided",
        success: false,
      });
      return;
    }

    const cdb = await cloudinary.v2.uploader.upload(file.content);

    postImage = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };

    const newPost = new Post({
      content,
      postImage,
      author,
      title,
    });

    // Save the post to the database
    await newPost.save();

    const user = await Users.findById(req.user._id).populate("followers");
    if (user && user.followers) {
      user.followers.forEach((follower: any) => {
        const socketId = connectedUsers.get(follower._id.toString());

        if (socketId) {
          io.to(socketId).emit("post-created", {
            user: author,
            post: newPost,
          });
        }
      });
    }

    res.status(200).json({
      msg: "New Post created successfully",
      success: true,
      newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error ",
      success: false,
      error,
    });
  }
};

export const getAllPostByUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(400).json({
        msg: "request body not send",
        success: false,
      });
      return;
    }
    const author = req.user._id;

    const posts = await Post.find({ author });

    res.status(200).json({
      msg: "All posts by user",
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error ",
      success: false,
      error,
    });
  }
};

export const getAllPostsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts = await Post.find({});

    res.status(200).json({
      msg: "All posts",
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error ",
      success: false,
      error,
    });
  }
};

export const getPostByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        msg: "request body not send",
        success: false,
      });
      return;
    }

    const post = await Post.findById(id);

    res.status(200).json({
      msg: "Post",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error ",
      success: false,
      error,
    });
  }
};

// delete post
export const deletePostController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        msg: "request body not send",
        success: false,
      });
      return;
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({
      msg: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error ",
      success: false,
      error,
    });
  }
};
