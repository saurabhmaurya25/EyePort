import express from 'express';

import {
    addProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCategoryAndType
} from '../controller/productController.js';
import upload from '../middleware/multer.js';

const router = express.Router();

//Get all products
router.get('/getProduct',getProduct);


//get any category and type of product
router.get('/getProductByCategoryAndType', getProductByCategoryAndType);


//Get any specific product by product ID
router.get('/getProductById/:productId',getProductById);

//add a new product
router.post('/addProduct',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1},{name: 'image5',maxCount:1}]),addProduct);

//update any product
router.put('/updateProduct',updateProduct);

//Delete any product
router.delete('/deleteProduct',deleteProduct);

export default router;
