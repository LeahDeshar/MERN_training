const client = require("./client");

async function init() {
  // Get all keys
  await client.lpush("messages", 1);
  await client.lpush("messages", 2);
  await client.lpush("messages", 3);
  await client.lpush("messages", 4);

  const result = await client.rpop("messages");
  console.log(result);
}

init();
