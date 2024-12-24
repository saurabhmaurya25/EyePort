import mongoose from "mongoose";

const {Schema} = mongoose;

const wishlistSchema = new Schema({
    name:{
        type: String,
        required: true,
    },

    userId:{
        type: String,
        required: true,
    },

    productId:{
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    price:{
        type: String,
        required: true,
    },

    discountPrice: {
        type: String,
        required: true,
    }

    
},{timestamps:true});

const Wishlist = mongoose.model("Wishlist",wishlistSchema);

export default Wishlist;