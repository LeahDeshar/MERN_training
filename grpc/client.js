const express = require("express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "myservice.proto"),
  { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true }
);
const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;

const client = new UserService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const app = express();
app.use(express.json());

app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;

  client.GetUser({ userId }, (error, response) => {
    if (error) {
      console.error("gRPC Error:", error);
      res.status(500).json({ error: error.message });
    } else {
      res.json(response);
    }
  });
});

app.post("/user", (req, res) => {
  const { name, email } = req.body;
  client.CreateUser({ name, email }, (error, response) => {
    if (error) {
      console.error("gRPC Error:", error);
      res.status(500).json({ error: error.message });
    } else {
      res.json(response);
    }
  });
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
