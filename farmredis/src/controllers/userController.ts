import { Request, Response } from "express";
import Users from "../models/userModel";
import { getDataUri } from "../utils/features";
import cloudinary from "cloudinary";

interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  profilePic?: {
    public_id: string;
    url: string;
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
    const { name, email, password, address, phone, role } = req.body;

    console.log(req.body);
    if (!name || !email || !password || !address || !phone) {
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
    }

    const user = await Users.create({
      name,
      email,
      password,
      address,
      phone,
      role,
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
      .cookie("token", token, {
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        secure: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      })
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

export const getUserProfileController = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const user = await Users.findById(req.user._id).select("-password");
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    console.log(req.user);
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User profile fetched failed",
    });
  }
};

export const logoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        secure: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      })
      .json({
        msg: "Logout successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error (logout)",
      success: false,
      error,
    });
  }
};

export const profileUpdateController = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const user = await Users.findById(req.user._id);
    if (!user) {
      res.status(400).json({
        msg: "User not found",
        success: false,
      });
      return;
    }

    const { name, email, address, phone } = req.body;
    // update validation
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();
    res.status(200).json({
      msg: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error (logout)",
      success: false,
      error,
    });
  }
};

// update user password
export const passUpdateController = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    const user = await Users.findById(req.user._id);
    if (!user) {
      res.status(400).json({
        msg: "User not found",
        success: false,
      });
      return;
    }
    const { password, newPassword } = req.body;
    // update validation
    if (!password || !newPassword) {
      res.status(400).json({
        msg: "Fill all the fields",
        success: false,
      });
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      res.status(400).json({
        msg: "Incorrect password",
        success: false,
      });
      return;
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      msg: "Password updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error (password update)",
      success: false,
      error,
    });
  }
};

export const profilePicUpdateController = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
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
    // Check if user has a profile picture already
    if (user.profilePic && user.profilePic.public_id) {
      // Delete previous profile picture from Cloudinary
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

export const resetPasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      res.status(400).json({
        msg: "Fill all the fields",
        success: false,
      });
    }
    const user = await Users.findOne({ email, answer });
    if (!user) {
      res.status(400).json({
        msg: "Email does not exist",
        success: false,
      });
      return;
    }
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      msg: "Password Reset",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Error (reset password)",
      success: false,
      error,
    });
  }
};
