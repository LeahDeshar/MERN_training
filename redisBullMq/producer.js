// producer.js
import { queue } from "./redis.js";

export const addJob = async (data) => {
  await queue.add("my-job", data);
  console.log("Job added:", data);
};

export const sampleJob = async () => {
  await addJob({ message: "Hello, BullMQ!" });
};
