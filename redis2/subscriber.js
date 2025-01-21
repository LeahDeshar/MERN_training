const Redis = require("ioredis");

const redis = new Redis();
redis.subscribe("notifications", (err, count) => {
  if (err) {
    console.error("Failed to subscribe:", err.message);
    return;
  }
  console.log(`Subscribed to ${count} channel(s). Waiting for messages...`);
});

redis.on("message", (channel, message) => {
  console.log(`Received message from ${channel}: ${message}`);
});
