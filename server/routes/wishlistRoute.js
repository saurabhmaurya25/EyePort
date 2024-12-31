import express from 'express';

import {
    addItemInWishlist,
    getItemInWishlistByUserId,
    deleteItemFromWishlist,
} from '../controller/wishlistController.js'

const router = express.Router();

//for adding any item in wishlist
router.post('/addItemInWishlist',addItemInWishlist);

//for getting any item from wishlist
router.get('/getItemInWishlistByUserId',getItemInWishlistByUserId);

//for delete any item from wishlist
router.delete('/deleteItemFromWishlist',deleteItemFromWishlist);


export default router;