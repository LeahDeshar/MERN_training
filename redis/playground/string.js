const client = require("./client");

async function init() {
  // Set a string
  await client.set("msg:1", "Hey from Node.js");
  const result = await client.get("msg:1");
  console.log(result);
}
init();
