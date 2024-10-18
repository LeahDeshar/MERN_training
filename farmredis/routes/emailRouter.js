import express from "express";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/sendEmail", isAuth, async (req, res) => {});
export default router;
