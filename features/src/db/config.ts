import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGO_URL as string;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log(
      `Successfully connected to database ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log("Error while connecting database", error);
  }
};
export default connectDB;
