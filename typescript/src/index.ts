const greet = (name: string): string => {
  return `Hello, ${name}!`;
};

console.log(greet("World"));

// task-1: Create a variable id that can be either a string or a number. Assign it different values and log them.

type userId = string | number;

const id: userId = "10";

// task-2: Write a function formatValue that takes a string | number and returns a formatted string
type value = string | number;
function formatValue(input: value): string {
  return `The input value is ${input}`;
}

// task-3:Write a function processValue that uses typeof to differentiate between string and number in a union type.

function processValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(`Value is a string with length: ${value.length}`);
  } else if (typeof value === "number") {
    console.log(`Value is a number with square: ${value * value}`);
  } else {
    console.log("Unknown type");
  }
}

processValue("Hello");
processValue(10);
