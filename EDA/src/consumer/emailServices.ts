import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";
import logger from "../config/logger";

dotenv.config();

const redisHost = process.env.REDIS_HOST;
const redisPort = Number(process.env.REDIS_PORT);
const redisPassword = process.env.REDIS_PASSWORD;
const emailClient: RedisClientType = createClient({
  password: redisPassword,
  socket: {
    host: redisHost,
    port: redisPort,
  },
});

emailClient.on("connect", () => {
  logger.info("Successfully connected to Redis");
});

emailClient.on("error", (err) => {
  logger.error(`Error connecting to Redis: ${err.message}`);
});

process.on("SIGINT", async () => {
  try {
    await emailClient.quit();
    logger.info("Redis emailClient disconnected gracefully");
    process.exit(0);
  } catch (err) {
    console.error("Error during Redis disconnection", err);
    process.exit(1);
  }
});

export const initRedisClient = async (): Promise<void> => {
  try {
    await emailClient.connect();
    logger.info("Redis emailClient connected successfully");
  } catch (error) {
    logger.error(`Error while connecting to Redis: ${error}`);
    process.exit(1);
  }
};

const runSubscriber = async () => {
  try {
    await emailClient.subscribe("user-registered", (message) => {
      console.log("Success");
      const event = JSON.parse(message);
      const { name, email } = event.payload;

      console.log(`Sending welcome email to ${name} (${email})`);
    });

    console.log("Subscribed to user-registered events");
  } catch (error) {
    console.error("Error with Redis subscriber:", error);
  }
};

runSubscriber();
