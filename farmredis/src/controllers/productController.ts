import { Request, Response } from "express";
import redisClient from "../db/redisConfig";
import categoryModel from "../models/categoryModel";
import Products from "../models/productModel";
import { getDataUri } from "../utils/features";
import cloudinary from "cloudinary";

interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  profilePic?: {
    public_id: string;
    url: string;
  };
}
interface RequestWithUser extends Request {
  user: User;
  file: Express.Multer.File;
}
export const getAllProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cachedProducts = await redisClient.get("allProducts");

    if (cachedProducts) {
      console.log("we have cached", cachedProducts);
      res.status(200).json({
        success: true,
        products: JSON.parse(cachedProducts),
        total: JSON.parse(cachedProducts).length,
      });
    }

    const products = await Products.find()
      .populate("farmer")
      .populate("category");

    await redisClient.set("allProducts", JSON.stringify(products), {
      EX: 3600,
    });
    res.status(200).json({
      success: true,
      products: products,
      total: products.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};
export const getAllFromSpecFarmerProductController = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    console.log(req.user._id);
    const products = await Products.find({ farmer: req.user })
      .populate("farmer")
      .populate("category");

    if (!products) {
      res.status(404).json({
        success: false,
        message: "No product found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      products: products,
      total: products.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};
// controller to get all top products
export const getTopProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Products.find({})
      .sort({ rating: -1 })
      .limit(6)
      .populate("farmer")
      .populate("category")
      .exec();
    res.status(200).json({
      success: true,
      message: "All Top 3 Product fetched",
      totalProduct: products.length,
      products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error in product api " + error.message,
    });
  }
};
export async function getOneProductController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    console.log(req.params.id);
    const product = await Products.findById(req.params.id)
      .populate("farmer")
      .populate("category")
      .exec();
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    console.log(product);
    res.status(200).json({
      success: true,
      message: "Product fetched",
      product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error in product api " + error.message,
    });
  }
}
export async function createproductController(
  req: RequestWithUser,
  res: Response
): Promise<void> {
  try {
    const { name, description, price, categoryId, quantity } = req.body;

    if (!name || !description || !price || !quantity || !categoryId) {
      res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const newProduct = await Products.create({
      name,
      description,
      price,
      category: categoryId,
      quantity,
      farmer: req.user,
    });

    const populatedProduct = await Products.findById(newProduct._id)
      .populate("farmer")
      .populate("category")
      .exec();
    res.status(200).json({
      success: true,
      message: "Product created",
      products: populatedProduct,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error in product api " + error.message,
    });
  }
}

// BUG******************************
// export async function updateProductController(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   // update product api
//   try {
//     const product = await Products.findById(req.params.id);
//     if (!product) {
//       res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//       return;
//     }
//     const { name, description, price, category, quantity } = req.body;
//     console.log(req.body);
//     // validation
//     if (name) product.name = name;
//     if (description) product.description = description;
//     if (price) product.price = price;
//     if (category) product.category = category;
//     if (quantity) product.quantity = quantity;

//     await product.save();
//     res.status(200).json({
//       success: true,
//       message: "Product updated",
//       // product
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: "Error in product api " + error.message,
//     });
//   }
// }

// BUG******************************
// export const updateImageProductController = async (
//   req: RequestWithUser,
//   res: Response
// ): Promise<void> => {
//   try {
//     const product = await Products.findById(req.params.id);
//     if (!product) {
//       res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//       return;
//     }
//     console.log(req.params);
//     const file = getDataUri(req.file);

//     if (!file.content) {
//       res.status(400).json({
//         msg: "No file content provided",
//         success: false,
//       });
//       return;
//     }

//     if (product && product.images && product.images.public_id) {
//       await cloudinary.v2.uploader.destroy(product.images.public_id);
//     }

//     const cdb = await cloudinary.v2.uploader.upload(file.content);

//     // Update user's profile picture
//     product.images = {
//       public_id: cdb.public_id,
//       url: cdb.secure_url,
//     };

//     // Save user
//     await product.save();

//     res.status(200).json({
//       message: "Image added successfully",
//       success: true,
//       product,
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Internal Error (profile pic update)",
//       success: false,
//       error,
//     });
//   }
// };

// BUG******************************
// export async function deleteProductController(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   try {
//     const product = await Products.findById(req.params.id);
//     if (!product) {
//       res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//       return;
//     }
//     // find and delete the image cloudinary
//     for (let index = 0; index < product.images.length; index++) {
//       await cloudinary.v2.uploader.destroy(product.images[index].public_id);
//     }
//     // delete the product
//     await product.deleteOne();
//     res.status(200).json({
//       success: true,
//       message: "Product deleted",
//       // product
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: "Error in product api " + error.message,
//     });
//   }
// }

// BUG******************************
// export async function deleteImageProductController(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   try {
//     const product = await Products.findById(req.params.id);
//     if (!product) {
//       res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//       return;
//     }
//     const id = req.query.id as string;
//     if (!id) {
//       res.status(400).json({
//         success: false,
//         message: "Product Image not found",
//       });
//       return;
//     }
//     let isExist = -1;
//     product?.images?.forEach((image: { _id: string }, index: number) => {
//       if (image._id.toString() === id.toString()) {
//         isExist = index;
//       }
//     });
//     if (isExist < 0) {
//       res.status(400).json({
//         success: false,
//         message: "Product Image not found",
//       });
//     }

//     // delete image from cloudinary
//     await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
//     // delete image from database
//     product.images.splice(isExist, 1);
//     await product.save();
//     res.status(200).json({
//       success: true,
//       message: "Product Image deleted",
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: "Error in product api " + error.message,
//     });
//   }
// }

// BUG******************************
// export async function createProductReviewController(
//   req: RequestWithUser,
//   res: Response
// ): Promise<void> {
//   try {
//     const { rating, comment } = req.body;
//     const product = await Products.findById(req.params.id);
//     if (!product) {
//       res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//       return;
//     }
//     // check if user already review the product
//     const isReviewed = product.reviews.find(
//       (review: { user: string }) =>
//         review.user.toString() === req.user._id.toString()
//     );
//     if (isReviewed) {
//       res.status(400).json({
//         success: false,
//         message: "Product already reviewed",
//       });
//     }
//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     };
//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;
//     product.rating =
//       product.reviews.reduce(
//         (acc: number, item: { rating: number }) => item.rating + acc,
//         0
//       ) / product.reviews.length;

//     await product.save();
//     res.status(200).json({
//       success: true,
//       message: "Product review created",
//       // product
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: "Error in product api " + error.message,
//     });
//   }
// }
