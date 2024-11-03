import express from "express";
import { addJob } from "./producer.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/jobs", async (req, res) => {
  const { message } = req.body;
  await addJob({ message });
  res.status(201).send({ message: "Job created!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
