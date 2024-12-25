import { useState } from "react";

const useCalculator = (num1: number, num2: number) => {
  const [firstNum, setFirstNum] = useState<number>(num1);
  const [secondNum, setSecondNum] = useState<number>(num2);

  const add = () => firstNum + secondNum;
  const subtract = () => firstNum - secondNum;
  const multiply = () => firstNum * secondNum;
  const divide = () => {
    if (secondNum === 0) {
      return "Cannot divide by zero";
    }
    return firstNum / secondNum;
  };

  return {
    firstNum,
    secondNum,
    setFirstNum,
    setSecondNum,
    add,
    subtract,
    multiply,
    divide,
  };
};

export default useCalculator;
