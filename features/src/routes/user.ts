import express from "express";

import { isAuth } from "../middleware/authMiddleware";
import { singleUpload } from "../middleware/multer";
import {
  createAvatarController,
  followUserController,
  loginController,
  registerController,
  unfollowUserController,
} from "../controllers/user";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);

router.post("/create-avatar", isAuth, singleUpload, createAvatarController);

router.post("/follow/:id", isAuth, followUserController);
router.post("/unfollow/:id", isAuth, unfollowUserController);

export default router;
