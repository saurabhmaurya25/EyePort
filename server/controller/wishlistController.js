import express from 'express';
import cors from 'cors';
import Wishlist from '../models/wishlist.js';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
dotenv.config();

//for adding item in wishlist
const addItemInWishlist = async(req,res) => {
    // console.log("I am in add item in wishlist in backend");
    const {name,userId,productId,image,frameColour,frameShape,frameType,price,discountPrice} = req.body;
    try{
        let wishlistItem = await Wishlist.findOne({userId,productId});
        if(wishlistItem){
            return res.status(200).json({wishlistId:wishlistItem._id,success:true,message: "This item was already in your wishlist"});
        } else {
            wishlistItem = new Wishlist({
                name,
                userId,
                productId,
                image,
                frameColour,
                frameType,
                frameShape,
                price,
                discountPrice
            });
            const saveWishlistItem = await wishlistItem.save();
            return res.status(201).json({wishlistId:saveWishlistItem._id,success:true,message: "Product addedd successfully in your wishlist"});
        }

    } catch(error){
        console.log("Error is; ",error);
        res.status(500).json({success: false, message: "server error,please try again later"});
    }
}

//for getting item in wishlist
const getItemInWishlistByUserId = async(req,res) => {
    const userId = req.query.userId;

    if(!userId){
        return res.status(400).json({message: "user ID is required"});
    }

    try{
        const wishlistItem = await Wishlist.find({userId:userId});
        if(!wishlistItem.length){
            return res.status(404).json({message: "No item found in wishlist"});
        }
        return res.status(200).json(wishlistItem);

    } catch(error){
        console.log("Error in get item from wishlist by user Id ", error);
        return res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

//for deleting any item from wishlist
const deleteItemFromWishlist = async(req,res) => {
    //this will be wishlist id of any particular wishlist item
    // console.log("I am in delete item from wishlist in backend",req.body);
    const id = req.body.id;
    try{
        const deletedItem = await Wishlist.findByIdAndDelete(id);
        if(!deletedItem){
            console.log("Item not found in wishlist");
            return res.status(200).json({success:true,message: "Item not found in wishlist"});
        }
        return res.status(200).json({success: true, message: "Product deleted successfully from wishlist"});
    } catch(error){
        console.log("Error in deleting item from wishlist",error);
        return res.status(500).json({message: "Internal server error"});
    }
    
}

//for deleting the whole item of any particular userId from admin in worst case
const deleteItemByUserIdFromWishlist = async(req,res) => {
    console.log("I am in delete item by user id from wishlist in backend");
}

export {addItemInWishlist,getItemInWishlistByUserId,deleteItemFromWishlist,deleteItemByUserIdFromWishlist};