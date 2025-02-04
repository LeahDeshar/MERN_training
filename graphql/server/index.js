const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const Book = require("./models/Book");
const mongoose = require("mongoose");
const User = require("./models/Users");

// start server

async function startApolloServer() {
  await mongoose
    .connect(
      "mongodb+srv://leahdesar:YIQsgaVrZBJhGUIL@cluster0.cnco2vy.mongodb.net/graphql"
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.error(err));

  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    type Book {
      _id: ID!
      title: String!
      author: String!
    }

    type User {
      _id: ID!
      username: String!
      password: String!
      email: String!
    }
    
    input BookInput {
      title: String!
      author: String!
    }

     input UserInput {
      username: String!
      password: String!
      email: String!
    }
    
    
    type Query {
      books: [Book]!
      getUser: User!

      book(id: ID!): Book
    }
    
    type Mutation {
    createUser(input: UserInput!): User!
      createBook(input: BookInput!): Book!
      updateBook(id: ID!, input: BookInput!): Book!
      deleteBook(id: ID!): Book!
    }      
    `,
    resolvers: {
      Query: {
        books: async () => await Book.find(),
        getUser: async () => await User.find(),
        book: async (_, { id }) => await Book.findById(id),
      },
      Mutation: {
        createUser: async (_, { input }) => await User.create(input),
        createBook: async (_, { input }) => await Book.create(input),
        updateBook: async (_, { id, input }) =>
          await Book.findByIdAndUpdate(id, input, { new: true }),
        deleteBook: async (_, { id }) => await Book.findByIdAndDelete(id),
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
