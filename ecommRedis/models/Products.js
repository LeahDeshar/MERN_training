const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["beauty", "fragrances", "furniture", "groceries"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  tags: {
    type: [String],
  },
  images: {
    type: [String],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
