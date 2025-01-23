"use strict";
const greet = (name) => {
    return `Hello, ${name}!`;
};
console.log(greet("World"));
const id = "10";
function formatValue(input) {
    return `The input value is ${input}`;
}
// task-3:Write a function processValue that uses typeof to differentiate between string and number in a union type.
function processValue(value) {
    if (typeof value === "string") {
        console.log(`Value is a string with length: ${value.length}`);
    }
    else if (typeof value === "number") {
        console.log(`Value is a number with square: ${value * value}`);
    }
    else {
        console.log("Unknown type");
    }
}
processValue("Hello");
processValue(10);
