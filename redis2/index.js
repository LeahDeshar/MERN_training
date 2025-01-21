const express = require("express");
const Redis = require("ioredis");
require("dotenv").config();

const app = express();
const port = 3000;

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

app.use(express.json());

// Route to set a key-value pair in Redis
// http:localhost:3000/set
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
// http:localhost:3000/get/:key
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
// http:localhost:3000/delete/:key

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
