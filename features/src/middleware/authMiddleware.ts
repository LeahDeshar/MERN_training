import JWT from "jsonwebtoken";
import Users from "../models/user";
import { NextFunction, Request, Response } from "express";

interface AuthRequest extends Request {
  user?: any; // Adjust the type
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
      message: "Unauthorized user (not auth 0)",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).send({
      success: false,
      message: "Unauthorized user (not auth)",
    });
    return;
  }

  try {
    const decodeData = JWT.verify(token, process.env.JWT_SECRET as string);

    if (typeof decodeData === "string" || !("_id" in decodeData)) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user ....",
      });
      return;
    }
    const user = await Users.findById(decodeData._id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in authentication:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized user (not auth 2)",
    });
    return;
  }
};
