import express from "express";
import { isAdmin, isAuth } from "../middleware/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create", isAuth, singleUpload, createCategory);
router.get("/getAll", getAllCategory);
router.delete("/delete/:id", isAuth, isAdmin, deleteCategory);
router.put("/update/:id", isAuth, isAdmin, updateCategory);

export default router;
