const express = require("express");
const Redis = require("ioredis");

const app = express();
const port = 3000;

// Connect to Redis
const redis = new Redis({
  host: "redis-10452.c246.us-east-1-4.ec2.redns.redis-cloud.com",
  port: 10452,
  password: "2TSsvRiFYSK27r9LnxRTfkw0FL25IqGh",
}); // By default, it connects to localhost:6379

// Middleware to parse JSON
app.use(express.json());

// Route to set a key-value pair in Redis
app.post("/set", async (req, res) => {
  const { key, value } = req.body;
  try {
    await redis.set(key, value);
    res.status(200).json({ message: `Key '${key}' set successfully.` });
  } catch (error) {
    res.status(500).json({ error: "Error setting key in Redis" });
  }
});

// Route to get a value from Redis
app.get("/get/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const value = await redis.get(key);
    if (value) {
      res.status(200).json({ key, value });
    } else {
      res.status(404).json({ error: `Key '${key}' not found.` });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving key from Redis" });
  }
});

// Route to delete a key-value pair from Redis
app.delete("/delete/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const result = await redis.del(key);
    if (result) {
      res.status(200).json({ message: `Key '${key}' deleted successfully.` });
    } else {
      res.status(404).json({ error: `Key '${key}' not found.` });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting key from Redis" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
