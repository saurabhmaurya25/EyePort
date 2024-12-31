import express from 'express';
import {
    signup, 
    login, 
    getUserData,
    updateProfile, 
    forgotPassword,
    changePhone,
    changePassword,
    addAddress,
    updateAddress,
    deleteAddress,
    userList,
} from '../controller/authController.js';

const router = express.Router();

router.get('/getUserData', getUserData);
router.get('/userList',userList);
router.post('/signup', signup);
router.post('/login',login);
router.put('/updateProfile',updateProfile);
router.put('/changePhone',changePhone);
router.put('/changePassword',changePassword);
router.post('/forgotPassword', forgotPassword);
router.post('/addAddress',addAddress);
router.put('/updateAddress',updateAddress);
router.delete('/deleteAddress',deleteAddress);

export default router;