import Order from "../models/orderModel.js"
import Products from "../models/productModel.js"
import { stripe } from "../index.js"

export async function createOrderController(req,res){
 try {
        const {orderItems,shippingInfo,paymentInfo,itemPrice,tax,shippingCharges,totalAmount,paymentMethod}=req.body
        if(!orderItems || orderItems.length===0){
            return res.status(400).json({
                success:false,
                message:"Order items not found"
            })
        }
        const order =  Order.create({
            orderItems,
            shippingInfo,
            paymentInfo,
            itemPrice,
            tax,
            shippingCharges,
            totalAmount,
            paymentMethod,
            user:req.user._id
        })
        // stock update
        for (let index = 0; index < order.length; index++) {
            const product = await Products.findById(order[i].product)
            product.stock -= orderItems[i].stock
            await product.save()
            
        }
        await order.save()
        return res.status(200).json({
            success:true,
            message:"Order created successfully",
            order
        })
    
 } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    
 }
}
export async function getAllOrderController(req,res){
    try {
        const orders = await Order.find({user: req.user._id})
        if(!orders)
            return res.status(404).json({
                success:false,
                message:"Orders not found"
            })
        return res.status(200).json({
            success:true,
            message:"Orders fetched successfully",
            totalOrder: orders.length,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

}
export async function getSingleOrderController(req,res){
    try {
        const order = await Order.findById(req.params.id)
        if(!order)
            return res.status(404).json({
                success:false,
                message:"Order not found"
            })
        return res.status(200).json({
            success:true,
            message:"Order fetched successfully",
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export async function updateOrderController(req,res){

}
export async function deleteOrderController(req,res){

}

// accept stripe payment
export async function StripePaymentController(req,res){
    try {
        const {totalAmount}=req.body
        console.log(req.body);
        // totalAmount validation
        if(!totalAmount || totalAmount<0)
            return res.status(400).json({
                success:false,
                message:"Invalid amount"
            })
        const {client_secret} = await stripe.paymentIntents.create({
            amount: Number(totalAmount),
            currency:"usd",
            // description:"Ecommerce payment",
            // payment_method:id,
            // confirm:true
        })
        res.status(200).json({
            success:true,
            client_secret,
            message:"Payment successful"
        })
    } catch (error) {
        console.log("Payment failed",error);
        res.status(400).json({
            success:false,
            message:"Payment failed"
        })
    }
}



// Admin order controllers
// getAllOrderAdminController
export async function getAllOrderAdminController(req,res){
    try {
        const orders = await Order.find({})
        if(!orders)
            return res.status(404).json({
                success:false,
                message:"Orders not found"
            })
        return res.status(200).json({
            success:true,
            message:"Orders fetched successfully",
            totalOrder: orders.length,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

}

// change the order status controller updateOrderAdminController
export async function updateOrderAdminController(req,res){
    try {
        const order = await Order.findById(req.params.id)
        if(!order)
            return res.status(404).json({
                success:false,
                message:"Order not found"
            })


        if(order.orderStatus === "processing"){
            order.orderStatus ="shipped"
        }else if(order.orderStatus === "shipped"){
            order.orderStatus = "delivered"
            order.deliveredAt = Date.now()
        }else{
            return res.status(400).json({
                success:false,
                message:"Order already delivered"
            })
        }
        await order.save()
        return res.status(200).json({
            success:true,
            message:"Order status updated successfully",
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}