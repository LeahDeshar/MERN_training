import express from "express";
import {
  createproductController,
  deleteImageProductController,
  deleteProductController,
  getAllFromSpecFarmerProductController,
  getAllProductController,
  getOneProductController,
  getTopProductController,
  updateImageProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, isAuth, isFarmer } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.get("/getAll", getAllProductController);

// get top 3 product
router.get("/getTop", getTopProductController);

router.get("/getOne/:id", getOneProductController);

// for famer
router.get(
  "/getAllProduct",
  isAuth,
  isFarmer,
  getAllFromSpecFarmerProductController
);

router.post("/create", isAuth, isFarmer, singleUpload, createproductController);
// update the product only
router.put("/update/:id", isAuth, isFarmer, updateProductController);
// update the product images
router.put(
  "/updateImage/:id",
  isAuth,
  isFarmer,
  singleUpload,
  updateImageProductController
);

router.delete("/delete/:id", isAuth, isFarmer, deleteProductController);
router.delete(
  "/deleteImage/:id",
  isAuth,
  isAdmin,
  deleteImageProductController
);
export default router;
