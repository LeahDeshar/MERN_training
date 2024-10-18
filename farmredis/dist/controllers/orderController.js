var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Order from "../models/orderModel";
import Products from "../models/productModel";
import { stripe } from "../index";
export function createOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { orderItems, shippingInfo, paymentInfo, itemPrice, tax, shippingCharges, totalAmount, paymentMethod } = req.body;
            if (!orderItems || orderItems.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Order items not found"
                });
            }
            const order = Order.create({
                orderItems,
                shippingInfo,
                paymentInfo,
                itemPrice,
                tax,
                shippingCharges,
                totalAmount,
                paymentMethod,
                user: req.user._id
            });
            for (let index = 0; index < order.length; index++) {
                const product = yield Products.findById(order[i].product);
                product.stock -= orderItems[i].stock;
                yield product.save();
            }
            yield order.save();
            return res.status(200).json({
                success: true,
                message: "Order created successfully",
                order
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    });
}
export function getAllOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield Order.find({ user: req.user._id });
            if (!orders)
                return res.status(404).json({
                    success: false,
                    message: "Orders not found"
                });
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully",
                totalOrder: orders.length,
                orders
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    });
}
export function getSingleOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield Order.findById(req.params.id);
            if (!order)
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            return res.status(200).json({
                success: true,
                message: "Order fetched successfully",
                order
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    });
}
export function updateOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
export function deleteOrderController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
export function StripePaymentController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { totalAmount } = req.body;
            console.log(req.body);
            if (!totalAmount || totalAmount < 0)
                return res.status(400).json({
                    success: false,
                    message: "Invalid amount"
                });
            const { client_secret } = yield stripe.paymentIntents.create({
                amount: Number(totalAmount),
                currency: "usd",
            });
            res.status(200).json({
                success: true,
                client_secret,
                message: "Payment successful"
            });
        }
        catch (error) {
            console.log("Payment failed", error);
            res.status(400).json({
                success: false,
                message: "Payment failed"
            });
        }
    });
}
export function getAllOrderAdminController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield Order.find({});
            if (!orders)
                return res.status(404).json({
                    success: false,
                    message: "Orders not found"
                });
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully",
                totalOrder: orders.length,
                orders
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    });
}
export function updateOrderAdminController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield Order.findById(req.params.id);
            if (!order)
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            if (order.orderStatus === "processing") {
                order.orderStatus = "shipped";
            }
            else if (order.orderStatus === "shipped") {
                order.orderStatus = "delivered";
                order.deliveredAt = Date.now();
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: "Order already delivered"
                });
            }
            yield order.save();
            return res.status(200).json({
                success: true,
                message: "Order status updated successfully",
                order
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    });
}
