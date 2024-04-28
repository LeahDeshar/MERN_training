const express = require("express");
const { multipleUpload } = require("../middleware/multer");
const { UploadMulImageController } = require("../controller/fileController");
const router = express.Router();

router.get("/getImages");
router.post("/mulupload", multipleUpload, UploadMulImageController);
module.exports = router;
