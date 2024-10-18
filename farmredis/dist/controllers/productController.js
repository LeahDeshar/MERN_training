var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import redisClient from "../db/redisConfig";
import Products from "../models/productModel";
import { getDataUri } from "../utils/features";
import cloudinary from "cloudinary";
export const getAllProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedProducts = yield redisClient.get("allProducts");
        if (cachedProducts) {
            console.log("we have cached", cachedProducts);
            return res.status(200).json({
                success: true,
                products: JSON.parse(cachedProducts),
                total: JSON.parse(cachedProducts).length,
            });
        }
        const products = yield Products.find()
            .populate("farmer")
            .populate("category");
        yield redisClient.set("allProducts", JSON.stringify(products), {
            EX: 3600,
        });
        return res.status(200).json({
            success: true,
            products: products,
            total: products.length,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message,
        });
    }
});
export const getAllFromSpecFarmerProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user._id);
        const products = yield Products.find({ farmer: req.user })
            .populate("farmer")
            .populate("category");
        return res.status(200).json({
            success: true,
            products: products,
            total: products.length,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message,
        });
    }
});
export function getTopProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield Products.find({})
                .sort({ rating: -1 })
                .limit(6)
                .populate("farmer")
                .populate("category")
                .exec();
            return res.status(200).json({
                success: true,
                message: "All Top 3 Product fetched",
                totalProduct: products.length,
                products,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in product api " + error.message,
            });
        }
    });
}
export function getOneProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.params.id);
            const product = yield Products.findById(req.params.id)
                .populate("farmer")
                .populate("category")
                .exec();
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            console.log(product);
            return res.status(200).json({
                success: true,
                message: "Product fetched",
                product,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in product api " + error.message,
            });
        }
    });
}
export function createproductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, price, categoryId, quantity } = req.body;
            if (!name || !description || !price || !quantity || !categoryId) {
                return res.status(400).json({
                    success: false,
                    message: "Please fill all the fields",
                });
            }
            const newProduct = yield Products.create({
                name,
                description,
                price,
                category: categoryId,
                quantity,
                farmer: req.user,
            });
            const populatedProduct = yield Products.findById(newProduct._id)
                .populate("farmer")
                .populate("category")
                .exec();
            return res.status(200).json({
                success: true,
                message: "Product created",
                products: populatedProduct,
            });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({
                success: false,
                message: "Error in product api " + error.message,
            });
        }
    });
}
export function updateProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield Products.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            const { name, description, price, category, quantity } = req.body;
            console.log(req.body);
            if (name)
                product.name = name;
            if (description)
                product.description = description;
            if (price)
                product.price = price;
            if (category)
                product.category = category;
            if (quantity)
                product.quantity = quantity;
            yield product.save();
            return res.status(200).json({
                success: true,
                message: "Product updated",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in product api " + error.message,
            });
        }
    });
}
export const updateImageProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Products.findById(req.params.id);
        console.log(req.params);
        const file = getDataUri(req.file);
        console.log(req.params.id);
        console.log(req.file);
        if (product && product.images && product.images.public_id) {
            yield cloudinary.v2.uploader.destroy(product.images.public_id);
        }
        const cdb = yield cloudinary.v2.uploader.upload(file.content);
        product.images = {
            public_id: cdb.public_id,
            url: cdb.secure_url,
        };
        yield product.save();
        return res.status(200).json({
            message: "Image added successfully",
            success: true,
            product,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Error (profile pic update)",
            success: false,
            error,
        });
    }
});
export function deleteProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.params.id);
            const product = yield Products.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            for (let index = 0; index < product.images.length; index++) {
                yield cloudinary.v2.uploader.destroy(product.images[index].public_id);
            }
            yield product.deleteOne();
            return res.status(200).json({
                success: true,
                message: "Product deleted",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in product api " + error.message,
            });
        }
    });
}
export function deleteImageProductController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield Products.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            const id = req.query.id;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Product Image not found",
                });
            }
            let isExist = -1;
            product.images.forEach((image, index) => {
                if (image._id.toString() === id.toString()) {
                    isExist = index;
                }
            });
            if (isExist < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Product Image not found",
                });
            }
            yield cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
            product.images.splice(isExist, 1);
            yield product.save();
            return res.status(200).json({
                success: true,
                message: "Product Image deleted",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in product api " + error.message,
            });
        }
    });
}
export function createProductReviewController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { rating, comment } = req.body;
            const product = yield Products.findById(req.params.id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            const isReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());
            if (isReviewed) {
                return res.status(400).json({
                    success: false,
                    message: "Product already reviewed",
                });
            }
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                    product.reviews.length;
            yield product.save();
            return res.status(200).json({
                success: true,
                message: "Product review created",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in product api " + error.message,
            });
        }
    });
}
