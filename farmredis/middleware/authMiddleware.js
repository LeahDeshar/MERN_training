import JWT from "jsonwebtoken";
import Users from "../models/userModel.js";

// export const isAuth = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized user",
//     });
//   }
//   const token = authHeader.split(" ")[1];
//   console.log("token", token);
//   if (!token) {
//     return res.status(401).send({
//       success: false,
//       message: "Unauthorized user",
//     });
//   }
//   const decodeData = JWT.verify(token, process.env.JWT_SECRET);
//   console.log("decodeData", decodeData);
//   const user = await Users.findById(decodeData._id);

//   if (!user) {
//     throw new Error("User not found");
//   }

//   req.user = user;
//   req.role = user.role;
//   // req.user = await Users.findById(decodeData._id);
//   // req.role = await Users.findById(decodeData._id);

//   next();
// };
export const isAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized user",
    });
  }

  try {
    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decodeData._id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    req.role = user.role; // Assuming role is stored in the user object

    next();
  } catch (error) {
    console.error("Error in authentication:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};
// admin auth middleware
export const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({
      success: false,
      message: "Unauthorized user,only admin",
    });
  }
  next();
};

export const isFarmer = async (req, res, next) => {
  if (req.user.role !== "farmer") {
    return res.status(401).send({
      success: false,
      message: "Unauthorized user,only farmer",
    });
  }
  next();
};
