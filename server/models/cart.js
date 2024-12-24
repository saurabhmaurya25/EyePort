import mongoose from "mongoose";

const {Schema} = mongoose;

const cartSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    
    userId: {
        type: String,
        required: true
    },

    productId: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true,
    },

    price: { 
        type: Number, 
        required: true,
        min: [0, "Price cannot be negative"]
    },

    discountPrice: { 
        type: Number,
        required: true,
        min: [0,"Price cannot be negative"]
    },

    quantity: {
        type: Number,
        required: true,
        min: [0, "quantity cannot be negative"]
    },

}, {timestamps:true });

const Cart = mongoose.model("Cart",cartSchema);

export default Cart;