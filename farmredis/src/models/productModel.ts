import mongoose from "mongoose";
//REVIEW MODELS
const reviewSchema = new mongoose.Schema(
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
// PRODUCT MODELS
const productSchema = new mongoose.Schema(
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

export const productModel = mongoose.model("Products", productSchema);
export default productModel;
