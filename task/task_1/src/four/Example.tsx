import React from "react";
import useWindowWidth from "../hooks/useWindowWidth";
import useCounter from "../hooks/useCounter";
import { ToastContainer } from "react-toastify";
function Example() {
  const width = useWindowWidth();
  const { counter, increment, decrement, reset } = useCounter();
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <ToastContainer />
      <h1>Custom Hook: useWindowWidth</h1>
      <p>
        The current window width is: <strong>{width}px</strong>
      </p>

      <p>{counter}</p>
      <button onClick={increment}>add</button>
      <button onClick={decrement}>decrease</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

export default Example;
