const express = require("express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const bodyParser = require("body-parser");
const PROTO_PATH = "./withFastApi/service.proto";
const axios = require("axios");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition).myservice;

const client = new proto.MyService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const app = express();
app.use(bodyParser.json());

// Define an API endpoint to interact with gRPC
app.post("/api/hello", (req, res) => {
  const { name } = req.body;

  client.SayHello({ name }, (error, response) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ error: "Error calling gRPC service" });
    }
    return res.send({ message: response.message });
  });
});

app.get("/api/hello/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/hello/${name}`); // Assuming FastAPI is running on port 8000
    return res.send(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error calling FastAPI endpoint" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
