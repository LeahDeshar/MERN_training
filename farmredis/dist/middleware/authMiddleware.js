var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JWT from "jsonwebtoken";
import Users from "../models/userModel";
export const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield Users.findById(decodeData._id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        req.role = user.role;
        next();
    }
    catch (error) {
        console.error("Error in authentication:", error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized user",
        });
    }
});
export const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role !== "admin") {
        return res.status(401).send({
            success: false,
            message: "Unauthorized user,only admin",
        });
    }
    next();
});
export const isFarmer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.role !== "farmer") {
        return res.status(401).send({
            success: false,
            message: "Unauthorized user,only farmer",
        });
    }
    next();
});
