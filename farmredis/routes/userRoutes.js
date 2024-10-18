import express from "express";
import {
  getUserProfileController,
  loginController,
  logoutController,
  passUpdateController,
  profilePicUpdateController,
  profileUpdateController,
  registerController,
  resetPasswordController,
} from "../controllers/userController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const router = express.Router();
router.post("/register", limiter, registerController);
router.post("/login", limiter, loginController);

// create a private route and verify them using the
// token
// create authentication middleware

router.get("/profile", isAuth, getUserProfileController);
router.get("/logout", isAuth, logoutController);

router.put("/profileUpdate", isAuth, profileUpdateController);
router.put("/passUpdate", isAuth, passUpdateController);
router.put("/picUpdate", isAuth, singleUpload, profilePicUpdateController);
router.post("/resetPassword", resetPasswordController);

export default router;
