import Fastify from "fastify";
import * as dotenv from "dotenv";
import db from "./config/db.config";
import postRoutes from "./routes/post.routes";
dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(db);
fastify.register(postRoutes);

fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});
const PORT = process.env.PORT || 3001;
try {
  await fastify.listen({ port: Number(PORT) });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
