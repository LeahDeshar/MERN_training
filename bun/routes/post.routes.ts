import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PostModel, type Post } from "../models/post.model";

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.post("/posts", async (request, reply) => {
    try {
      const newPost = new PostModel(request.body);
      const savedPost = await newPost.save();
      return {
        savedPost,
      };
    } catch (error) {
      reply.status(500).send({ error: "Failed to create post" });
    }
  });

  fastify.get("/posts", async (_, reply) => {
    try {
      const posts = await PostModel.find();
      reply.send(posts);
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch posts" });
    }
  });

  interface PostParams {
    id: string;
  }
  fastify.get(
    "/posts/:id",
    async (
      request: FastifyRequest<{ Params: PostParams }>,
      reply: FastifyReply
    ) => {
      try {
        const post = await PostModel.findById(request.params.id);
        if (!post) return reply.status(404).send({ error: "Post not found" });
        reply.send(post);
      } catch (error) {
        reply.status(500).send({ error: "Failed to fetch post" });
      }
    }
  );
  interface PostBody {
    title?: string;
    content?: string;
  }

  fastify.put(
    "/posts/:id",
    async (
      request: FastifyRequest<{ Params: PostParams; Body: PostBody }>,
      reply: FastifyReply
    ) => {
      try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          request.params.id,
          request.body,
          { new: true }
        );
        if (!updatedPost)
          return reply.status(404).send({ error: "Post not found" });
        reply.send(updatedPost);
      } catch (error) {
        reply.status(500).send({ error: "Failed to update post" });
      }
    }
  );

  // Delete a post
  fastify.delete(
    "/posts/:id",
    async (
      request: FastifyRequest<{ Params: PostParams }>,
      reply: FastifyReply
    ) => {
      try {
        const deletedPost = await PostModel.findByIdAndDelete(
          request.params.id
        );
        if (!deletedPost)
          return reply.status(404).send({ error: "Post not found" });
        reply.send({ message: "Post deleted successfully" });
      } catch (error) {
        reply.status(500).send({ error: "Failed to delete post" });
      }
    }
  );
}
