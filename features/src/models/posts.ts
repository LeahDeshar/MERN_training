import mongoose, { CallbackError, Document, Schema } from "mongoose";

interface IPost extends Document {
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  likes: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
}

const postSchema = new Schema<IPost>({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;
