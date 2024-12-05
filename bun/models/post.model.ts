import { model, Schema, Document } from "mongoose";

// Define the Post schema
const postSchema = new Schema<Post>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    //   author: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export interface Post extends Document {
  title: string;
  content: string;
  author: string;
}

export const PostModel = model<Post>("Post", postSchema);
