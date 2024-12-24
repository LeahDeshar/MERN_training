import { useState } from "react";
import { toast } from "react-toastify";
const useCounter = () => {
  const [counter, setCounter] = useState<number>(0);

  const increment = () => {
    setCounter(counter + 1);
  };
  const decrement = () => {
    if (counter <= 0) {
      toast.error("Counter cannot be less than 0");
      return;
    }
    setCounter(counter - 1);
  };
  const reset = () => {
    setCounter(0);
  };

  return { counter, increment, decrement, reset };
};

export default useCounter;
