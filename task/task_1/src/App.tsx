import React, { Suspense } from "react";
import "./App.css";
// const Home = React.lazy(() => import("./three/Home"));
const Home = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./three/Home"));
      }, 2000);
    })
);
const About = React.lazy(() => import("./three/About"));
const Contact = React.lazy(() => import("./three/Contact"));
function App() {
  return (
    <>
      <h1>Projects</h1>
      {/* <Filter /> */}

      <Suspense fallback={<p>Loading...</p>}>
        <Home />
        <About />
        <Contact />
      </Suspense>
    </>
  );
}

export default App;
