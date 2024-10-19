import express from "express";
import { isAuth } from "../middleware/authMiddleware";
import { singleUpload } from "../middleware/multer";
import {
  acceptFriendRequest,
  createAvatarController,
  declineFriendRequest,
  followUserController,
  loginController,
  registerController,
  sendFriendRequest,
  unfollowUserController,
} from "../controllers/user";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);

router.post("/create-avatar", isAuth, singleUpload, createAvatarController);

router.post("/follow/:id", isAuth, followUserController);
router.post("/unfollow/:id", isAuth, unfollowUserController);

router.post("/friend-request/send/:id", isAuth, sendFriendRequest);
router.post("/friend-request/accept/:id", isAuth, acceptFriendRequest);
router.post("/friend-request/decline/:id", isAuth, declineFriendRequest);

export default router;
