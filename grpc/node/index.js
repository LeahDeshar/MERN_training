const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "myservice.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const userProto = grpc.loadPackageDefinition(packageDefinition).UserService;

const getUser = (call, callback) => {
  const userId = call.request.id;
  const user = { id: userId, name: "John Doe" };
  callback(null, user);
};
const createUser = (call, callback) => {
  const { name, email } = call.request;
  const newUserId = "123";
  const message = `User ${name} created successfully!`;
  callback(null, { userId: newUserId, message, email });
};
const server = new grpc.Server();
server.addService(userProto.service, {
  GetUser: getUser,
  CreateUser: createUser,
});

const address = "0.0.0.0:50051";
server.bindAsync(
  address,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error(`Server binding error: ${error.message}`);
      return;
    }
    console.log(`Server running at ${address}`);
  }
);
