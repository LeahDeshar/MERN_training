import express from "express";
import { Server } from "socket.io";
import { createCommentController } from "../controllers/comment";
import { isAuth } from "../middleware/authMiddleware";

const router = express.Router();

const setupCommentRoutes = (io: Server) => {
  router.post("/create-comment", isAuth, (req, res) => {
    createCommentController(req, res, io);
  });

  return router;
};

export default setupCommentRoutes;
