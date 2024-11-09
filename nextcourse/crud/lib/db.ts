import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;
export const connect = async () => {
  const conState = mongoose.connection.readyState;
  if (conState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (conState === 2) {
    console.log("connecting...");
    return;
  }
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
