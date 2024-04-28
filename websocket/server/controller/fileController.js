const cloudinary = require("cloudinary");
const { getDataUri } = require("../util/features");
const fileModel = require("../models/fileModel");
exports.UploadMulImageController = async (req, res) => {
  try {
    console.log("entered");

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one file",
      });
    }

    const images = [];

    for (const file of req.files) {
      const fileDataUri = getDataUri(file);
      const result = await cloudinary.uploader.upload(fileDataUri.content);
      const image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
      images.push(image);
    }

    await fileModel.create({
      images,
    });

    return res.status(200).json({
      success: true,
      message: "images created",
      images,
      // product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in product API: " + error.message,
    });
  }
};
exports.GetAllImagesController = async (req, res) => {
  try {
    const images = await fileModel.find();

    return res.status(200).json({
      success: true,
      message: "All images fetched",
      totalImages: images.length,
      images,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in product API: " + error.message,
    });
  }
};
