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

// delete all the images of a specific
exports.DeleteImageController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("delete entered", id);
    const image = await fileModel.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    await cloudinary.uploader.destroy(image.images[0].public_id);
    await fileModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Image deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in product API: " + error.message,
    });
  }
};

// delete specific from the images
// Controller method to handle image deletion
exports.deleteSpecImageController = async (req, res) => {
  try {
    const { id, imageId } = req.params;
    console.log(id, imageId);

    // Find the product by its ID
    const image = await fileModel.findById(id);

    // If the image doesn't exist, return an error
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find the index of the image in the product's images array
    const imageIndex = image.images.findIndex((img) => img._id == imageId);

    // If the image doesn't exist, return an error
    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Remove the image from the product's images array
    image.images.splice(imageIndex, 1);

    // Save the updated product
    await image.save();

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting image: " + error.message,
    });
  }
};
