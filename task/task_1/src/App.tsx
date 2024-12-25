import React, { Suspense } from "react";
import "./App.css";
import Example from "./five/Example";
// const Home = React.lazy(() => import("./three/Home"));
const Home = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./three/Home"));
      }, 2000);
    })
);
// const About = React.lazy(() => import("./three/About"));
// const Contact = React.lazy(() => import("./three/Contact"));
function App() {
  return (
    <div>
      <h1>Projects</h1>
      {/* <Filter /> */}

      <Suspense fallback={<p>Loading...</p>}>
        {/* <Home />
        <About />
        <Contact /> */}
        <Example />
      </Suspense>
    </div>
  );
}

export default App;
