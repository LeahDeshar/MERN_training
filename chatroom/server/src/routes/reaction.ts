import express from "express";
import { Server } from "socket.io";
import { isAuth } from "../middleware/authMiddleware";
import { createReactionController } from "../controllers/reaction";

const router = express.Router();

const setupReactionRoutes = (io: Server) => {
  router.post("/create-reaction", isAuth, (req, res) => {
    createReactionController(req, res, io);
  });

  return router;
};

export default setupReactionRoutes;
