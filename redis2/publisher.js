const Redis = require("ioredis");

const redis = new Redis();
setInterval(() => {
  const message = `Hello! The time is ${new Date().toISOString()}`;
  redis.publish("notifications", message);
  console.log(`Published: ${message}`);
}, 2000);
