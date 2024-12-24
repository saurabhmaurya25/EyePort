import express from 'express';

import {
    addItemInWishlist,
    getItemInWishlistByUserId,
    deleteItemFromWishlist,
    deleteItemByUserIdFromWishlist
} from '../controller/wishlistController.js'

const router = express.Router();

//for adding any item in wishlist
router.post('/addItemInWishlist',addItemInWishlist);

//for getting any item from wishlist
router.get('/getItemInWishlistByUserId',getItemInWishlistByUserId);

//for delete any item from wishlist
router.delete('/deleteItemFromWishlist',deleteItemFromWishlist);

//for delete the whole wishlist of any particular user
router.delete('/deleteItemByUserIdFromWishlist',deleteItemByUserIdFromWishlist)

export default router;