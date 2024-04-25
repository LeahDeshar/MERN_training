import { useState } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const query = gql`
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
  const { loading, error, data } = useQuery(query);
  console.log(data);
  return (
    <>
      <h1>hello</h1>
    </>
  );
}

export default App;
