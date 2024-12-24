import mongoose from "mongoose";

const {Schema} = mongoose;

const orderSchema = new Schema({
    
    userName: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        required: true
    },

    products: [{
        image: {
            type: String,
            required: true,
        },

        productName: {
            type: String,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: [0, "quantity cannot be negative"]
        },


        productId: {
            type: String,
            required: true
        },

    }],

    address: {
        type: String,
        required: true,
    },

    phoneNo : {
        type: Number,
    },

    modeOfPayment: {
        type: String,
        required: true,
        enum: ["UPI","Net Banking","Credit or debit card","EMI","Cash on Delivery"],
    },

    orderStatus: {
        type: String,
        enum: ["Order Placed","Packing","Shipped","Out for delivery","Delivered"],
        required: true,
    },


    price: { 
        type: Number, 
        required: true,
        min: [0, "Price cannot be negative"]
    },


    date: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true,
    }

}, {timestamps:true });

const Order = mongoose.model("Order",orderSchema);

export default Order;