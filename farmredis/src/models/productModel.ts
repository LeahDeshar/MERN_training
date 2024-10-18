import mongoose, { Document, Schema } from "mongoose";

interface IReview extends Document {
  rating: number;
  comment: string;
  user: mongoose.Schema.Types.ObjectId;
}
const reviewSchema = new Schema<IReview>(
  {
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "user id is required"],
    },
  },
  { timestamps: true }
);
interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: mongoose.Schema.Types.ObjectId;
  images: {
    public_id: string;
    url: string;
  };
  farmer: mongoose.Schema.Types.ObjectId;
  reviews: [typeof reviewSchema];
  rating: number;
  numReviews: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
    },
    description: {
      type: String,
      required: [true, "produvct description is required"],
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "product stock required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      // type: String
    },
    images: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model<IProduct>("Products", productSchema);
export default productModel;
