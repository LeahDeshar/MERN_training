import express from "express";
import { Server } from "socket.io";
import { isAuth } from "../middleware/authMiddleware";
import { singleUpload } from "../middleware/multer";
import {
  createPostController,
  deletePostController,
  getAllPostByUserController,
  getAllPostsController,
  getPostByIdController,
} from "../controllers/posts";

const router = express.Router();
const setupPostRoutes = (io: Server) => {
  router.post("/create-post", isAuth, singleUpload, (req, res) => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    createPostController(req, res, io);
    io.emit("post-created", { author: req.user._id });
  });

  router.get("/get-post", isAuth, getAllPostByUserController);
  router.get("/get-post/all", isAuth, getAllPostsController);
  router.get("/get-post/:id", isAuth, getPostByIdController);

  router.delete("/delete-post/:id", isAuth, deletePostController);

  return router;
};

export default setupPostRoutes;
