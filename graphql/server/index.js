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
        type Todo{
            id: ID!
            title: String!
            completed: Boolean!
        }
        
        type Query{
            getTodo: [Todo]
        }
    `,
    resolvers: {
      Query: {
        getTodo: async () =>
          await axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then((res) => res.data),
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
