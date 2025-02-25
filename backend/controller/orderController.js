import Order from "../models/orderModel.js";
import Product from '../models/productModel.js';
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";

export const createNewOrder = handleAsyncError( async (req, res, next) => {
    const {shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice} = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success:true,
        order
    })
})

export const getSingleOrder = handleAsyncError( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if(!order) {
        return next(new HandleError("No order found", 404))
    }

    res.status(200).json({
        success: true,
        order
    })

})