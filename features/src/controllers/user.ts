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
interface RequestWithUser extends Request {
  user: User;
  file: Express.Multer.File;
}

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    console.log(req.body);
    if (!username || !email || !password) {
      res.status(400).json({
        msg: "Fill all the fields",
        success: false,
      });
    }

    const findEmail = await Users.findOne({ email: email });
    if (findEmail) {
      res.status(400).json({
        msg: "Email already exist",
        success: false,
      });
      return;
    }

    const user = await Users.create({
      username,
      email,
      password,
    });
    if (!user) {
      res.status(400).json({
        msg: "Something went wrong",
        success: false,
      });
    }

    res.status(200).json({
      msg: "User created successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Internal Error (register)",
      success: false,
      error,
    });
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    // login validation
    if (!email || !password) {
      res.status(400).json({
        msg: "Fill all the fields",
        success: false,
      });
    }
    // check if email exist
    let user = await Users.findOne({ email });
    if (!user) {
      res.status(400).json({
        msg: "Email does not exist",
        success: false,
      });
      return;
    }
    // check if password is correct
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      res.status(400).json({
        msg: "Incorrect password",
        success: false,
      });
      return;
    }

    const token = user.generateJWT();

    res
      .status(200)

      .json({
        msg: "Login successfully",
        success: true,
        user,
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Internal Error (login)",
      success: false,
      error,
    });
  }
};

export const createAvatarController = async (
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
export const followUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.params) {
      res.status(400).json({
        msg: "request params not send",
        success: false,
      });
      return;
    }

    if (!req.user) {
      res.status(400).json({
        msg: "request body not send",
        success: false,
      });
      return;
    }
    const userIdToFollow = req.params.id;
    const userIdToFollowObj = new mongoose.Types.ObjectId(userIdToFollow);
    const currentUserId = req.user._id;

    console.log("first", userIdToFollowObj, currentUserId);

    if (!mongoose.Types.ObjectId.isValid(userIdToFollow)) {
      res.status(400).json({ message: "Invalid user ID." });
      return;
    }

    // Check if already following
    const currentUser = await Users.findById(currentUserId);
    console.log("current", currentUser);
    if (currentUser?.following.includes(userIdToFollowObj)) {
      res.status(400).json({ message: "Already following this user." });
      return;
    }

    // Follow the user
    currentUser?.following.push(userIdToFollowObj);
    await currentUser?.save();

    // Update the followed user's followers list
    await Users.findByIdAndUpdate(userIdToFollow, {
      $addToSet: { followers: currentUserId },
    });

    res.status(200).json({
      msg: "User followed successfully",
      success: true,
      currentUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error (follow user)",
      success: false,
      error,
    });
  }
};
export const unfollowUserController = async (
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
    const userIdToUnfollow = req.params.id;
    const currentUserId = req.user._id;

    await Users.findByIdAndUpdate(currentUserId, {
      $pull: { following: userIdToUnfollow },
    });

    // Remove from followed user's followers list
    await Users.findByIdAndUpdate(userIdToUnfollow, {
      $pull: { followers: currentUserId },
    });

    res.status(200).json({ message: "User unfollowed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

export const sendFriendRequest = async (
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
    const recipientId = req.params.id;
    const recipientIdObj = new mongoose.Types.ObjectId(recipientId);
    const currentUserId = req.user._id; // Assuming you have user ID in req.user

    // Check if already sent
    const currentUser = await Users.findById(currentUserId);

    if (currentUser?.friendRequestsSent.includes(recipientIdObj)) {
      res.status(400).json({ message: "Friend request already sent." });
    }

    // Send the friend request
    await Users.findByIdAndUpdate(currentUserId, {
      $addToSet: { friendRequestsSent: recipientId },
    });

    await Users.findByIdAndUpdate(recipientId, {
      $addToSet: { friendRequestsReceived: currentUserId },
    });

    res.status(200).json({ message: "Friend request sent successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

export const acceptFriendRequest = async (
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
    const requesterId = req.params.id; // User ID who sent the request
    const currentUserId = req.user._id; // Assuming you have user ID in req.user

    // Remove from friend requests
    await Users.findByIdAndUpdate(currentUserId, {
      $pull: { friendRequestsReceived: requesterId },
    });

    await Users.findByIdAndUpdate(requesterId, {
      $pull: { friendRequestsSent: currentUserId },
      $addToSet: { friends: currentUserId },
    });

    await Users.findByIdAndUpdate(currentUserId, {
      $addToSet: { friends: requesterId },
    });

    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

export const declineFriendRequest = async (
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
    const requesterId = req.params.id;
    const currentUserId = req.user._id; // Assuming you have user ID in req.user

    // Remove from friend requests
    await Users.findByIdAndUpdate(currentUserId, {
      $pull: { friendRequestsReceived: requesterId },
    });

    await Users.findByIdAndUpdate(requesterId, {
      $pull: { friendRequestsSent: currentUserId },
    });

    res.status(200).json({ message: "Friend request declined." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

// export const getUserProfileController = async (
//   req: RequestWithUser,
//   res: Response
// ): Promise<void> => {
//   try {
//     const user = await Users.findById(req.user._id).select("-password");
//     if (!user) {
//       res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//       return;
//     }
//     console.log(req.user);
//     res.status(200).json({
//       success: true,
//       message: "User profile fetched successfully",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "User profile fetched failed",
//     });
//   }
// };

// export const profileUpdateController = async (
//   req: RequestWithUser,
//   res: Response
// ): Promise<void> => {
//   try {
//     const user = await Users.findById(req.user._id);
//     if (!user) {
//       res.status(400).json({
//         msg: "User not found",
//         success: false,
//       });
//       return;
//     }

//     const { name, email, address, phone } = req.body;
//     // update validation
//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (address) user.address = address;
//     if (phone) user.phone = phone;
//     await user.save();
//     res.status(200).json({
//       msg: "Profile updated successfully",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Internal Error (logout)",
//       success: false,
//       error,
//     });
//   }
// };

// update user password
// export const passUpdateController = async (
//   req: RequestWithUser,
//   res: Response
// ): Promise<void> => {
//   try {
//     const user = await Users.findById(req.user._id);
//     if (!user) {
//       res.status(400).json({
//         msg: "User not found",
//         success: false,
//       });
//       return;
//     }
//     const { password, newPassword } = req.body;
//     // update validation
//     if (!password || !newPassword) {
//       res.status(400).json({
//         msg: "Fill all the fields",
//         success: false,
//       });
//     }
//     const isMatch = await user.isValidPassword(password);
//     if (!isMatch) {
//       res.status(400).json({
//         msg: "Incorrect password",
//         success: false,
//       });
//       return;
//     }
//     user.password = newPassword;
//     await user.save();
//     res.status(200).json({
//       msg: "Password updated successfully",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Internal Error (password update)",
//       success: false,
//       error,
//     });
//   }
// };
