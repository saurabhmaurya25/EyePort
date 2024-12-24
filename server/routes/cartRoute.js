import express from 'express';

import {
    addItem,
    getItembyUserId,
    updateQuantity,
    deleteItem,
    deleteItemByUserId

} from '../controller/cartController.js';

const router = express.Router();


//add item in cart
router.post('/addItem',addItem);


//for update quantity of cart
router.put('/updateQuantity',updateQuantity);


//for get item of cart by User Id
router.get('/getItembyUserId',getItembyUserId);


//for deleting any item 
router.delete('/deleteItem',deleteItem);

//for deleting the whole cart of any user
router.delete('/deleteItemByUserId',deleteItemByUserId);

export default router;