import { Request, RequestHandler, Response } from 'express';
import Users from '../model/user';
import { getDataUri } from '../utils/features';
import cloudinary from 'cloudinary';

declare module 'express-serve-static-core' {
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

    console.log(username, email, password);
    if (!username || !email || !password) {
      console.log('problem');
      res.status(400).json({
        msg: 'Fill all the fields',
        success: false,
      });
    }

    const findEmail = await Users.findOne({ email: email });
    if (findEmail) {
      res.status(400).json({
        msg: 'Email already exist',
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
        msg: 'Something went wrong',
        success: false,
      });
    }

    res.status(200).json({
      msg: 'User created successfully',
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'Internal Error (register)',
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

    console.log(email, password);
    // login validation
    if (!email || !password) {
      res.status(400).json({
        msg: 'Fill all the fields',
        success: false,
      });
    }
    // check if email exist
    let user = await Users.findOne({ email });
    if (!user) {
      res.status(400).json({
        msg: 'Email does not exist',
        success: false,
      });
      return;
    }
    // check if password is correct
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      res.status(400).json({
        msg: 'Incorrect password',
        success: false,
      });
      return;
    }

    const token = user.generateJWT();

    res
      .status(200)

      .json({
        msg: 'Login successfully',
        success: true,
        user,
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'Internal Error (login)',
      success: false,
      error,
    });
  }
};
export const currentUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log('here');
    if (!req.user) {
      res.status(400).json({
        msg: 'request body not send',
        success: false,
      });
      return;
    }
    const user = await Users.findById(req.user._id);
    res.status(200).json({
      message: 'Fetched user successfully',
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to get current user',
      success: false,
      error,
    });
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(400).json({
        msg: 'request body not send',
        success: false,
      });
      return;
    }
    const user = await Users.findById(req.user._id);

    if (!user) {
      res.status(400).json({
        msg: 'User not found',
        success: false,
      });
      return;
    }

    // find and send all the users except the current user
    const users = await Users.find({ _id: { $ne: req.user._id } }).select(
      '-password'
    );
    // const users = await Users.find({}).select("-password");
    // // send all users except the current itself

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to fetch users',
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
        msg: 'request body not send',
        success: false,
      });
      return;
    }
    const user = await Users.findById(req.user._id);

    if (!user) {
      res.status(400).json({
        msg: 'User not found',
        success: false,
      });
      return;
    }

    // get the photo from client
    const file = getDataUri(req.file);
    if (!file.content) {
      res.status(400).json({
        msg: 'No file content provided',
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
      msg: 'Profile pic updated successfully',
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Internal Error (profile pic update)',
      success: false,
      error,
    });
  }
};
