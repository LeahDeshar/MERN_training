var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Category from "../models/categoryModel";
import Product from "../models/productModel";
import { getDataUri } from "../utils/features";
import cloudinary from "cloudinary";
export function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const cdb = yield cloudinary.v2.uploader.upload(file.content);
            yield Category.create({
                name,
                image: {
                    public_id: cdb.public_id,
                    url: cdb.secure_url,
                },
            });
            return res.status(200).json({
                success: true,
                message: `${name} Category created `,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in category api " + error.message,
            });
        }
    });
}
export function getAllCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield Category.find({});
            return res.status(200).json({
                success: true,
                message: `Category created `,
                total: category.length,
                category,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in category api " + error.message,
            });
        }
    });
}
export function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const category = yield Category.findById(id);
            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: "Category not found ",
                });
            }
            const products = yield Product.find({ category: category._id });
            for (let index = 0; index < products.length; index++) {
                const product = products[index];
                product.category = undefined;
                yield products.save();
            }
            yield category.deleteOne();
            return res.status(200).json({
                success: true,
                message: `Category deleted `,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in category api " + error.message,
            });
        }
    });
}
export function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield Category.findById(req.params.id);
            console.log(category);
            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: "Category not found ",
                });
            }
            const { updateCategory } = req.body;
            console.log(updateCategory);
            const products = yield Product.find({ category: category._id });
            for (let index = 0; index < products.length; index++) {
                const product = products[index];
                product.category = updateCategory;
                yield products.save();
            }
            if (updateCategory) {
                category.category = updateCategory;
            }
            yield category.save();
            return res.status(200).json({
                success: true,
                message: `Category updated `,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in category api " + error.message,
            });
        }
    });
}
