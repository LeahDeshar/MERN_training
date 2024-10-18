import express  from "express";
import { isAdmin, isAuth } from "../middleware/authMiddleware.js";
import { StripePaymentController, createOrderController, deleteOrderController, getAllOrderAdminController, getAllOrderController, getSingleOrderController, updateOrderAdminController, updateOrderController } from "../controllers/orderController.js";
 
const router = express.Router();

router.post("/create",isAuth,createOrderController)
router.get("/getAll",isAuth,getAllOrderController)
router.get("/getOne/:id",isAuth,getSingleOrderController)

router.post("/payments",isAuth,StripePaymentController)
router.delete("/delete/:id",isAuth,deleteOrderController)
router.put("/update/:id",isAuth,updateOrderController)


// admin part of order management
router.get("/admin/getAll",isAuth,isAdmin,getAllOrderAdminController)

// change order status controller
router.put("/admin/updateOrder/:id",isAuth,isAdmin,updateOrderAdminController)

export default router;