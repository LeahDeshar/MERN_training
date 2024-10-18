import { createClient, RedisClientType } from "redis";

const redisClient: RedisClientType = createClient({
  password: "2TSsvRiFYSK27r9LnxRTfkw0FL25IqGh",
  socket: {
    host: "redis-10452.c246.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 10452,
  },
});
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});
redisClient.on("error", (err: Error) => {
  console.error("Redis Client Error", err);
});

redisClient.connect().catch((err: Error) => {
  console.error("Failed to connect to Redis", err);
});

export default redisClient;
