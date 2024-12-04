import client from "../config/redis";

const runSubscriber = async () => {
  try {
    await client.subscribe("user-registered", (message) => {
      console.log("Success");
      const event = JSON.parse(message);
      const { name, email } = event.payload;

      console.log(`Sending welcome email to ${name} (${email})`);
    });

    console.log("Subscribed to user-registered events");
  } catch (error) {
    console.error("Error with Redis subscriber:", error);
  }
};

runSubscriber();
