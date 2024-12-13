import React, { useMemo, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const expensiveCalculation = (num: number) => {
    console.log("Computing expensive calculation...");
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += num;
    }
    return result;
  };
  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);
  return (
    <div>
      <h1>Counter</h1>
      <div className="card">
        <div>
          <button onClick={() => setCount(count + 1)}>Increase Counter</button>
          <button onClick={() => setCount(count - 1)}>Decrease Counter</button>
        </div>

        <h2>Counter: {count}</h2>

        <h2>Expensive Calculation Result: {memoizedValue}</h2>
      </div>
    </div>
  );
}

export default Counter;
