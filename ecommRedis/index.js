const express = require("express");

const redis = require("redis");
const connectDB = require("./db/db");

const app = express();
const port = process.env.PORT || 8001;

connectDB();

// Redis client
const redisClient = redis.createClient();

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

app.use(express.json());

// Cache middleware
const cache = (req, res, next) => {
  const { id } = req.params;
  redisClient.get(id, (err, data) => {
    if (err) throw err;
    if (data) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

// Routes
app.get("/product/:id", cache, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      redisClient.setex(id, 3600, JSON.stringify(product)); // Cache product for 1 hour
      res.send(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new product
app.post("/product", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
