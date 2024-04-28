const express = require("express");
const { multipleUpload } = require("../middleware/multer");
const {
  UploadMulImageController,
  GetAllImagesController,
  DeleteImageController,
  deleteSpecImageController,
} = require("../controller/fileController");
const router = express.Router();

router.get("/getImages", GetAllImagesController);
router.post("/mulupload", multipleUpload, UploadMulImageController);

router.delete("/deleteImage/:id", DeleteImageController);

router.delete("/deleteImage/:id/images/:imageId", deleteSpecImageController);
module.exports = router;
