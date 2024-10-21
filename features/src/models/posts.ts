import mongoose, { CallbackError, Document, Schema } from "mongoose";

interface IPost extends Document {
  content: string;
  title: string;
  author: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  likes: mongoose.Schema.Types.ObjectId[];
  comments: mongoose.Schema.Types.ObjectId[];
  postImage?: {
    public_id?: string;
    url?: string;
  };
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  postImage: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;
