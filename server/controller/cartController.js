import express from 'express';
import cors from 'cors';
import Cart from '../models/cart.js';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
dotenv.config();


//for store the item in cart
const addItem = async (req, res) => {
    // console.log("I am in my addItem cart",req.body);
    const { name, userId, productId, image, price, discountPrice, quantity } = req.body;

    try {
        let cartItem = await Cart.findOne({ userId, productId });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({ success: true, message: "Cart updated successfully" });
        } else {
            cartItem = new Cart({
                name,
                userId,
                productId,
                image,
                price,
                discountPrice,
                quantity,
            });
            await cartItem.save();
            return res.status(201).json({ success: true, message: "Product added successfully to cart" });
        }
    } catch (error) {
        console.error("Error adding item to cart:", error);
        return res.status(500).json({ message: "Server error, please try again later" });
    }
};


//for get the item of cart
const updateQuantity = async (req, res) => {
    const { id, quantity } = req.body;
    //this id is cart id (Neither product id nor user ID ) so this is always unique
    if (!id || quantity === undefined) {
        return res.status(400).json({ message: "Invalid data provided." });
    }

    try {
        // Assuming you're using Mongoose to interact with MongoDB
        const updatedItem = await Cart.findByIdAndUpdate(
            id,
            { quantity: quantity },
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found in cart." });
        }

        // console.log("Quantity updated successfully");
        res.status(200).json({
            message: "Quantity updated successfully.",
        });
    } catch (error) {
        console.error("Error updating quantity:", error);
        res.status(500).json({ message: "An error occurred while updating quantity." });
    }
};


const getItembyUserId = async (req, res) => {
    // Extract the user ID from the query parameters
    const userId = req.query.userId;

    // Validate the user ID
    if (!userId) {
        return res.status(400).json({message: 'User ID is required' });
    }

    try {
        // Find the cart items for the given user ID
        const cartItems = await Cart.find({ userId: userId });

        // If no items found, return an empty array
        if (!cartItems.length) {
            return res.status(404).json({ message: 'No items found for this user' });
        }

        // Return the cart items as a response
        return res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};




//for delete any item of cart
const deleteItem = async (req, res) => {
    const id = req.body.id;
    //this id is cart id (Neither product id nor user ID ) so this is always unique
    try {
        // Assuming you are using a model named 'CartItem' for your cart items
        const deletedItem = await Cart.findByIdAndDelete(id);
            
        // Check if the item was found and deleted
        if (!deletedItem) {
            return res.status(200).json({success: true,message: "Item not found" });
        }

        return res.status(200).json({success: true, message: "Item deleted successfully"});
    } catch (error) {
        console.log('Error in deleting the item', error);
        return res.status(500).json({success: false, message: "Internal Server error" });
    }
}

const deleteItemByUserId = async(req,res) => {
    //this is for when we have to delete complete cart for a particular user
    try {
        
        // Extract user ID from the request body
        const userId = req.body.userId;
        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: "User ID is required" 
            });
        }

        // Delete all cart items for the given user ID
        const result = await Cart.deleteMany({ userId });

        // Send a successful response
        res.status(200).json({
            success: true,
            message: "Cart items deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting cart items:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to delete cart items",
            error: error.message
        });
    }
    
}
export {addItem,getItembyUserId,updateQuantity,deleteItem,deleteItemByUserId};
