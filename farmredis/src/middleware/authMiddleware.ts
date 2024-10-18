import JWT from "jsonwebtoken";
import Users from "../models/userModel";
import { NextFunction, Request, Response } from "express";
interface AuthRequest extends Request {
  user?: any; // Adjust the type according to your user model
  role?: string; // Assuming role is a string
}
export const isAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send({
      success: false,
      message: "Unauthorized user",
    });
    return;
  }

  try {
    const decodeData = JWT.verify(token, process.env.JWT_SECRET as string);
    if (typeof decodeData === "string" || !("id" in decodeData)) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
      return;
    }
    const user = await Users.findById(decodeData._id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    req.role = user.role; // Assuming role is stored in the user object

    next();
  } catch (error) {
    console.error("Error in authentication:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
    return;
  }
};
// admin auth middleware
export const isAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user.role !== "admin") {
    res.status(401).send({
      success: false,
      message: "Unauthorized user,only admin",
    });
    return;
  }
  next();
};

export const isFarmer = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user.role !== "farmer") {
    res.status(401).send({
      success: false,
      message: "Unauthorized user,only farmer",
    });
    return;
  }
  next();
};
