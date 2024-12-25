import useWindowWidth from "../hooks/useWindowWidth";
import useCounter from "../hooks/useCounter";
import { ToastContainer } from "react-toastify";
import useToggle from "../hooks/useToggle";
import useTimer from "../hooks/useTimer";
import useCalculator from "../hooks/useCalculator";
function Example() {
  const width = useWindowWidth();
  const { add, subtract } = useCalculator(10, 20);
  const { counter, increment, decrement, reset } = useCounter();
  const { toggleState, handleToggle } = useToggle();
  const { time, isRunning, startTimer, stopTimer, pauseTimer } = useTimer();

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

      <p>{toggleState ? "ON" : "OFF"}</p>
      <button onClick={handleToggle}>Toggle</button>

      <div>
        <h1>Timer: {time} seconds</h1>
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={pauseTimer} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={stopTimer}>Stop</button>
      </div>

      <div>
        <h1>useCalculator Example</h1>
      </div>
    </div>
  );
}

export default Example;
