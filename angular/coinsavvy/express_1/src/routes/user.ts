import express from 'express';
import { Server } from 'socket.io';
import {
  registerController,
  loginController,
  createAvatarController,
  currentUserController,
  getAllUsersController,
} from '../controller/user';
import { isAuth } from '../middleware/authMiddleware';
import { singleUpload } from '../middleware/multer';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

router.get('/get-current-user', isAuth, currentUserController);
router.get('/get-all-users', isAuth, getAllUsersController);
router.post('/create-avatar', isAuth, singleUpload, createAvatarController);

export default router;
