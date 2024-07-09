const client = require("./client");

async function init() {
  // set operations
  await client.sadd("users", "alice");
  await client.sadd("users", "bob");
  await client.sadd("users", "charlie");
  await client.sadd("users", "david");
  await client.sadd("users", "alice");
  const result1 = await client.smembers("users");
  console.log(result1);

  //   remove the set
  await client.srem("users", "david");

  const result2 = await client.smembers("users");
  console.log(result2);
}

init();
