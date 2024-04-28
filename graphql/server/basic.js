const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

// start server

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    type User{
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
        }
       
        type Todo{
            id: ID!
            title: String!
            completed: Boolean!
            user: User
        }
        
        
        type Query{
            getTodo: [Todo]
            getUsers: [User]
            getUser(id: ID!): User
        }

        type Mutation {
          deleteUser(id: ID!): [User]
          addUser(name:String!,username:String!,email:String!,phone:String!,website:String!): User
          updateUser(id:ID!,name:String,username:String,email:String,phone:String,website:String): User

        }
    `,
    resolvers: {
      Todo: {
        user: async (todo) =>
          await axios
            .get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
            .then((res) => res.data),
      },
      Query: {
        getTodo: async () =>
          await axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then((res) => res.data),

        getUsers: async () =>
          await axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.data),
        getUser: async (_, { id }) =>
          await axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => res.data),
      },
      Mutation: {
        deleteUser: async (_, { id }) => {
          await axios.delete(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
          return await axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.data);
        },
        addUser: async (_, { name, username, email, phone, website }) => {
          const user = {
            name,
            username,
            email,
            phone,
            website,
          };
          return await axios
            .post("https://jsonplaceholder.typicode.com/users", user)
            .then((res) => res.data);
        },
        updateUser: async (
          _,
          { id, name, username, email, phone, website }
        ) => {
          const user = {
            name,
            username,
            email,
            phone,
            website,
          };
          return await axios
            .put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
            .then((res) => res.data);
        },
      },
    },
    context: ({ req }) => {
      return {
        headers: req.headers,
      };
    },
  });
  app.use(cors());
  app.use(bodyParser.json());
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  //   server.applyMiddleware({
  //     app,
  //     path: "/graphql",
  //   });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000`);
  });
}
startApolloServer().catch((error) => {
  console.error(error);
});
