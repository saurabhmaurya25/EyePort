import express from 'express';
import cors from 'cors'
import Order from '../models/order.js';
import Product from '../models/product.js'
import dotenv from 'dotenv';

const app = express();
app.use(cors());
dotenv.config();

const addOrder = async (req,res) => {
    try{
        const {
            userName, 
            userId, 
            productPairs, 
            address, 
            phoneNo, 
            paymentMethod,
            totalPrice, 
            formattedDate, 
            formattedTime,
        } = req.body;
    // Map productPairs to match the products array format in the schema
        const products = productPairs.map(productArray => ({
            image: productArray[0],        // First element is image
            productName: productArray[1],  // Second element is product name
            quantity: productArray[2],     // Third element is quantity
            productId: productArray[3]     // Fourth element is product ID
        }));

        const newOrder = new Order({
            userName,
            userId,
            products,
            address,
            phoneNo,
            modeOfPayment: paymentMethod,
            orderStatus: "Order Placed", // Initial status for a new order
            price: totalPrice,
            date: formattedDate,
            time: formattedTime
        });

        await newOrder.save();
        for (const product of products) {
            const existingProduct = await Product.findById(product.productId);
            if (!existingProduct) {
                return res.status(404).json({ message: `Product with ID ${product.productId} not found` });
            }
            if (existingProduct.stockQuantity < product.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product ${product.productName}` });
            }
            existingProduct.stockQuantity -= product.quantity;
            await existingProduct.save();
        }
        

        // console.log("Order placed successfully");

        res.status(201).json({
            success: true,
            message: "Order placed successfully"
        });
    } catch(error){
        console.log("Error in placing order",error.message);
        res.status(500).json({
            success: false,
            message: "Failed to place order",
            error: error.message
        });
    }

}

const deleteOrder = async (req,res) => {
    console.log("I am in deleteOrder table which will be managed by admin only");
}

const getOrderByUserId = async(req,res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({message: 'User ID is required' });
    }

    try {
        // Find the order for the given user ID
        const orderItems = await Order.find({ userId: userId });

        // If no items found, return an empty array
        if (!orderItems.length) {
            return res.status(200).json({ message: 'No order found' });
        }

        // Return the cart items as a response
        return res.status(200).json(orderItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const getOrder = async(req,res) => {
    console.log("I am in getting the whole order");
}

export {addOrder,deleteOrder,getOrderByUserId,getOrder};