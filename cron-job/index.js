import cron from "node-cron";
import express from "express";
const app = express();
const port = 3000;

const exportData = () => {
  const name = "Report 1";
  console.log(name);
};

const cronExpression = "*/15 * * * * *";
// check if exp is valid
if (cron.validate(cronExpression)) {
  cron.schedule(cronExpression, () => {
    exportData();
  });
}

// Middleware
app.use(express.json());

// Simple GET route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/data", (req, res) => {
  res.send("Hello, World!");
});
// Simple POST route
app.post("/data", (req, res) => {
  const receivedData = req.body;
  res.json({ message: "Data received", data: receivedData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
