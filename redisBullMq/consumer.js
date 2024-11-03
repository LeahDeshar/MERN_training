import { Worker } from "bullmq";
import { redisClient } from "./redis.js";

const worker = new Worker(
  "my-queue",
  async (job) => {
    console.log("Processing job:", job.id, job.data);

    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Job completed:", job.id);
  },
  { connection: redisClient }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} has been completed!`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} has failed with error ${err.message}`);
});
