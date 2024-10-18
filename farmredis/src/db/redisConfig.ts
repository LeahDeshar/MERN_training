import redis from "redis";

const redisClient = redis.createClient({
  password: "2TSsvRiFYSK27r9LnxRTfkw0FL25IqGh",
  socket: {
    host: "redis-10452.c246.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 10452,
  },
});
//  = redis.createClient();
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

redisClient.connect();

export default redisClient;
