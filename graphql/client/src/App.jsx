import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const query = `
query ExampleQuery {
  getTodo {
    id
    title
    
    user {
      name
    }
  }
}
`;
function App() {
  return (
    <>
      <h1>hello</h1>
    </>
  );
}

export default App;
