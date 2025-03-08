import { createClient, RedisClientType } from "redis";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

const redisHost = process.env.REDIS_HOST;
const redisPort = Number(process.env.REDIS_PORT);
const redisPassword = process.env.REDIS_PASSWORD;
const client: RedisClientType = createClient({
  password: redisPassword,
  socket: {
    host: redisHost,
    port: redisPort,
  },
});

// Event listeners for connection and errors
client.on("connect", () => {
  logger.info("Successfully connected to Redis");
});

client.on("error", (err) => {
  logger.error(`Error connecting to Redis: ${err.message}`);
});

process.on("SIGINT", async () => {
  try {
    await client.quit();
    logger.info("Redis client disconnected gracefully");
    process.exit(0);
  } catch (err) {
    console.error("Error during Redis disconnection", err);
    process.exit(1);
  }
});

export const initRedisClient = async (): Promise<void> => {
  try {
    await client.connect();
    logger.info("Redis client connected successfully");
  } catch (error) {
    logger.error(`Error while connecting to Redis: ${error}`);
    process.exit(1);
  }
};

export default client;
