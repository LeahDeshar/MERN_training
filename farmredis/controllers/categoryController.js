import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";

export async function createCategory(req, res) {
  try {
    const { name } = req.body;
    const file = getDataUri(req.file);
    console.log(name);
    if (!name || !file) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category name and an image file",
      });
    }
    const cdb = await cloudinary.v2.uploader.upload(file.content);

    // Create category with image details
    await Category.create({
      name,
      image: {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      },
    });
    // await Category.create({ name });
    return res.status(200).json({
      success: true,
      message: `${name} Category created `,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in category api " + error.message,
    });
  }
}

export async function getAllCategory(req, res) {
  try {
    const category = await Category.find({});
    return res.status(200).json({
      success: true,
      message: `Category created `,
      total: category.length,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in category api " + error.message,
    });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found ",
      });
    }
    // find the product with this category and delete together
    const products = await Product.find({ category: category._id });
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      product.category = undefined;
      await products.save();
    }
    await category.deleteOne();
    return res.status(200).json({
      success: true,
      message: `Category deleted `,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in category api " + error.message,
    });
  }
}

export async function updateCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    console.log(category);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found ",
      });
    }
    const { updateCategory } = req.body;

    console.log(updateCategory);
    const products = await Product.find({ category: category._id });
    for (let index = 0; index < products.length; index++) {
      const product = products[index];
      product.category = updateCategory;
      await products.save();
    }

    if (updateCategory) {
      category.category = updateCategory;
    }
    await category.save();
    return res.status(200).json({
      success: true,
      message: `Category updated `,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in category api " + error.message,
    });
  }
}
