import { Queue, Worker } from "bullmq";
import { Redis } from "ioredis";

export const redisClient = new Redis({
  password: "2TSsvRiFYSK27r9LnxRTfkw0FL25IqGh",

  host: "redis-10452.c246.us-east-1-4.ec2.redns.redis-cloud.com",
  port: 10452,
  maxRetriesPerRequest: null,
});
redisClient
  .on("connect", async () => {
    console.log("Connected to Redis");
  })
  .on("error", console.error);

export const queue = new Queue("my-queue", { connection: redisClient });
const scheduleJob = async () => {
  try {
    const result = await queue.add("my-queue", {
      message: "Hello BullMQ!",
    });
    console.log("result", result.id);
  } catch (error) {
    console.error(error);
  }
};
