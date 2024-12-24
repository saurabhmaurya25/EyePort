import express from 'express';

import {
    addOrder,
    deleteOrder,
    getOrderByUserId,
    getOrder

} from '../controller/orderController.js';

const router = express.Router();

//for adding any order
router.post('/addOrder',addOrder);

//for deleting any order by admin
router.delete('/deleteOrder',deleteOrder);

//for getting any order by userId
router.get('/getOrderByUserId',getOrderByUserId);

//for getting the whole order
router.get('/getOrder',getOrder);

export default router;