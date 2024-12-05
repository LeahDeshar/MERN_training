import fastifyPlugin from "fastify-plugin";
import mongoose from "mongoose";

const db = async (fastify: any) => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    fastify.log.info("MongoDB connected");
  } catch (error) {
    fastify.log.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default fastifyPlugin(db);
