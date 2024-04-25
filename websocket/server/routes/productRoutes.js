const express = require("express");
const router = express.Router();
const { singleUpload } = require("../middleware/multer");
const {
  createproductController,
  getAllProductController,
} = require("../controller/productController");

router.get("/getAll", getAllProductController);
router.post("/create", singleUpload, createproductController);

module.exports = router;
