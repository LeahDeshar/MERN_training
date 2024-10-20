import { Request, RequestHandler, Response } from "express";
import Users from "../models/user";
import { getDataUri } from "../utils/features";
import cloudinary from "cloudinary";
import mongoose, { Types } from "mongoose";

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
    const { content } = req.body;
    const user = await Users.findById(req.user._id);

    if (!user) {
      res.status(400).json({
        msg: "User not found",
        success: false,
      });
      return;
    }

    // get the photo from client
    const file = getDataUri(req.file);
    if (!file.content) {
      res.status(400).json({
        msg: "No file content provided",
        success: false,
      });
      return;
    }

    if (user.profilePic && user.profilePic.public_id) {
      await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
    }

    // Upload new profile picture to Cloudinary
    const cdb = await cloudinary.v2.uploader.upload(file.content);

    // Update user's profile picture
    user.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };

    // Save user
    await user.save();

    res.status(200).json({
      msg: "Profile pic updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error (profile pic update)",
      success: false,
      error,
    });
  }
};
