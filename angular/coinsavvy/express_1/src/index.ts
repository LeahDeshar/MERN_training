import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import morgan from 'morgan';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import connnectDB from './db/db';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import logger from './config/logger';
import limiter from './middleware/rateLimit';
import { initRedisClient } from './config/redis';
import authRouter from './routes/user';

export const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(limiter);

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      io?: Server;
    }
  }
}
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

connnectDB();
initRedisClient();
mongoose.connection.on('error', (error) => {
  logger.error(`MongoDB connection error: ${error.message}`);
});

const PORT = process.env.PORT || 8083;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE'],
  },
});
app.use((req: Request, res: Response, next: NextFunction) => {
  req.io = io;
  next();
});

app.use('/api/v1/auth', authRouter);
// app.use("/api/v1/post", setupPostRoutes(io));

// app.use("/api/v1/comment", setupCommentRoutes(io));

io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('join', (userId, otherId) => {
    socket.join(userId);
    logger.info(`User ${userId} and ${otherId} joined their room`);
  });
});

// Sample Routes
app.get('/', (req, res) => {
  logger.info('Root route accessed');
  res.send('Welcome to the API!');
});

// Start the server
httpServer.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
