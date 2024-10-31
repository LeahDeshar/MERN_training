// import express from "express";
// import { isAuth } from "../middleware/authMiddleware";
// import { singleUpload } from "../middleware/multer";
// import {
//   acceptFriendRequest,
//   createAvatarController,
//   declineFriendRequest,
//   followUserController,
//   loginController,
//   registerController,
//   sendFriendRequest,
//   unfollowUserController,
// } from "../controllers/user";

// const router = express.Router();
// router.post("/register", registerController);
// router.post("/login", loginController);

// router.post("/create-avatar", isAuth, singleUpload, createAvatarController);

// router.post("/follow/:id", isAuth, followUserController);
// router.post("/unfollow/:id", isAuth, unfollowUserController);

// router.post("/friend-request/send/:id", isAuth, sendFriendRequest);
// router.post("/friend-request/accept/:id", isAuth, acceptFriendRequest);
// router.post("/friend-request/decline/:id", isAuth, declineFriendRequest);

// export default router;

import express from "express";
import { Server } from "socket.io";
import {
  registerController,
  loginController,
  createAvatarController,
  currentUserController,
  getAllUsersController,
} from "../controllers/user";
import { isAuth } from "../middleware/authMiddleware";
import { singleUpload } from "../middleware/multer";

const router = express.Router();

const setupRoutes = (io: Server) => {
  router.post("/register", registerController);
  router.post("/login", loginController);

  router.get("/get-current-user", isAuth, currentUserController);
  router.get("/get-all-users", isAuth, getAllUsersController);
  router.post("/create-avatar", isAuth, singleUpload, createAvatarController);

  // router.post("/follow/:id", isAuth, (req, res) => {
  //   if (!req.user) {
  //     res.status(401).json({ message: "Unauthorized" });
  //     return;
  //   }

  //   followUserController(req, res);
  //   io.emit("follow", { userId: req.params.id, followerId: req.user._id });
  // });

  // router.post("/unfollow/:id", isAuth, (req, res) => {
  //   if (!req.user) {
  //     res.status(401).json({ message: "Unauthorized" });
  //     return;
  //   }
  //   unfollowUserController(req, res);
  //   io.emit("unfollow", { userId: req.params.id, unfollowerId: req.user._id }); // Emit event on unfollow
  // });

  // router.post("/friend-request/send/:id", isAuth, (req, res) => {
  //   if (!req.user) {
  //     res.status(401).json({ message: "Unauthorized" });
  //     return;
  //   }
  //   sendFriendRequest(req, res);
  //   io.to(req.params.id).emit("friend-request", { from: req.user._id }); // Notify the recipient
  // });

  // router.post("/friend-request/accept/:id", isAuth, (req, res) => {
  //   if (!req.user) {
  //     res.status(401).json({ message: "Unauthorized" });
  //     return;
  //   }
  //   acceptFriendRequest(req, res);
  //   io.to(req.params.id).emit("friend-request-accepted", {
  //     from: req.user._id,
  //   }); // Notify sender
  // });

  // router.post("/friend-request/decline/:id", isAuth, (req, res) => {
  //   if (!req.user) {
  //     res.status(401).json({ message: "Unauthorized" });
  //     return;
  //   }
  //   declineFriendRequest(req, res);
  //   io.to(req.params.id).emit("friend-request-declined", {
  //     from: req.user._id,
  //   }); // Notify sender
  // });

  return router;
};

export default setupRoutes;
