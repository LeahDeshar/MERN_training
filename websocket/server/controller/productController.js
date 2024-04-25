const Products = require("../models/productModel");
const cloudinary = require("cloudinary");
const { getDataUri } = require("../util/features");
exports.createproductController = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    console.log(req.body);
    // validation
    if (!name || !description || !price || !stock) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // file validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }
    const file = getDataUri(req.file);

    const result = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    await Products.create({
      name,
      description,
      price,
      stock,
      images: [image],
    });
    return res.status(200).json({
      success: true,
      message: "Product created",
      // product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in product api " + error.message,
    });
  }
};

exports.getAllProductController = async (req, res) => {
  try {
    const products = await Products.find();

    return res.status(200).json({
      success: true,
      message: "All Product fetched",
      totalProduct: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in product api " + error.message,
    });
  }
};
