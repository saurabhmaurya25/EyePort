import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    brandName: { type: String, required: true },
    description: {type: String},
    productType: { type: String, required: true },
    frameType: { type: String},
    frameShape: {type:String},
    modelNo: {type:String},
    frameSize: {type:String},
    frameWidht: {type:String},
    frameDimension: {type: String},
    ageGroup: {type: String},
    frameColour: {type: String},
    weight: {type:String},
    weightGroup: {type: String},
    material: {type:String},
    frameMaterial: {type:String},
    templeMaterial: {type: String},
    prescriptionType: {type:String},
    frameStyle: {type:String},
    ProductCollection: {type:String},
    warranty: {type:String},
    gender: {type:String},
    height: {type:String},
    condition: {type:String},
    templeColour: {type:String},
    deliveryTime: {type:String,required:true},
    price: { type: Number, required: true,min: [0, "Price cannot be negative"]},
    discountPrice: { 
        type: Number,
        validate: {
            validator: function(value) {
                return value < this.price;
            },
            message: "Discount price must be lower than the actual price"
        }
    },
    stockQuantity: { type: Number,required: true,min: [0, "Stock quantity cannot be negative"]},
    images: [{ type: String, required: true,}],
    isActive: {type: Boolean, default: true },
    creatorId: {type: String, default:true},
    creatorName: {type: String,default:true},
    date:{
        type: String,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
