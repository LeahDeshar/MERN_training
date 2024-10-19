import mongoose, { Document, Schema } from "mongoose";

interface IReaction extends Document {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  type: "like" | "love" | "haha" | "wow" | "sad" | "angry";
  comment?: string;
  createdAt: Date;
}
const reactionSchema = new Schema<IReaction>({
  type: {
    type: String,
    enum: ["like", "love", "haha", "wow", "sad", "angry"],
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", default: null },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },

  createdAt: { type: Date, default: Date.now },
});

const Reaction = mongoose.model<IReaction>("Reaction", reactionSchema);
export default Reaction;
