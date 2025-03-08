import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl as string);
    console.log(
      `Successfully connected to database ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log("Error while connecting database", error);
  }
};
export default connectDB;
