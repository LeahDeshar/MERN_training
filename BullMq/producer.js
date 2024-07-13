const { Queue } = require("bullmq");

const queue = new Queue("email-queue");

async function init() {
  const res = await queue.add("email to john", {
    email: "john.dev",
    subject: "Welcome",
    body: "Hey John , Welcome to ...",
  });

  console.log("Job added to the queue", res.id);
}
init();
