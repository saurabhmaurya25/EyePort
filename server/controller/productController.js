import express from 'express';
import cors from 'cors';
import Product from "../models/product.js";
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options); // Using 'en-GB' for day-month-year format
};
const app = express();
app.use(cors());

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Get a product by its id
const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId; // Assuming you're using /product/:id
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log('Error while getting product by id', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//get a product by its category
const getProductByCategoryAndType = async (req, res) => {
  try {
    const { category, type } = req.query; // Extract both category and type from query

    const query = {};
    
    // Only add category to the query if it is provided
    if (category) {
      query.category = category;
    }

    // Add type to the query
    if (type) {
      query.type = type;
    }
    // Query the database to find products that match both category and type
    const products = await Product.find(query);

    // If no products are found, return an appropriate response
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for the given category and type' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error while getting product by category and type', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Create a product
const addProduct = async (req, res) => {
  try {
    // Extract product details from req.body
    const {
      brandName,
      productType,
      frameType,
      frameShape,
      modelNo,
      frameSize,
      frameWidth,
      frameDimension,
      ageGroup,
      frameColour,
      weight,
      weightGroup,
      material,
      frameMaterial,
      templeMaterial,
      prescriptionType,
      frameStyle,
      ProductCollection,
      warranty,
      gender,
      height,
      condition,
      templeColour,
      deliveryTime,
      price,
      discountPrice,
      stockQuantity,
      description,
      creatorId,
      creatorName
    } = req.body;

    // Check if the product with the same modelNo already exists
    const existingProduct = await Product.findOne({ modelNo: modelNo });

    if (existingProduct) {
      // If a product with the same modelNo exists, return a message
      return res.json({success:false, message: 'Product with this model number already exists.' });
    }

    // Handle uploaded images
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const image5 = req.files.image5 && req.files.image5[0];

    const images = [image1, image2, image3, image4, image5].filter((item) => item !== undefined);

    // Upload images to Cloudinary and get their URLs
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );
    // Create a new product with the data

    const currentDate = formatDate(new Date());
    const newProduct = new Product({
      brandName,
      description,
      productType,
      frameType,
      frameShape,
      modelNo,
      frameSize,
      frameWidth,
      frameDimension,
      ageGroup,
      frameColour,
      weight,
      weightGroup,
      material,
      frameMaterial,
      templeMaterial,
      prescriptionType,
      frameStyle,
      ProductCollection,
      warranty,
      gender,
      height,
      condition,
      templeColour,
      deliveryTime,
      price,
      discountPrice,
      stockQuantity,
      images: imagesUrl, // Store image URLs
      creatorId,
      creatorName,
      date: currentDate // Current timestamp
    });

    // Save the new product to the database
    await newProduct.save();

    // Send a success response
    res.status(200).json({ success:true,message: 'Product added successfully!' });

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({success:false, message: 'Error adding product. Please try again.' });
  }
};


// Update a product by id
const updateProduct = async (req, res) => {
  // console.log(req.body);
  try {
    const productId = req.body._id;
    const product = await Product.findById(productId);

    if(!product){
      return res.status(404).json({error: 'Product not found'});
    }

    product.brandName = req.body.brandName;
    product.description = req.body.description;
    product.productType = req.body.productType;
    product.frameType = req.body.frameType;
    product.frameShape = req.body.frameShape;
    product.modelNo = req.body.modelNo;
    product.frameSize = req.body.frameSize;
    product.frameWidht = req.body.frameWidth;
    product.frameDimension = req.body.frameDimension;
    product.ageGroup = req.body.ageGroup;
    product.frameColour = req.body.frameColour;
    product.weight = req.body.weight;
    product.weightGroup = req.body.weightGroup;
    product.material = req.body.material;
    product.frameMaterial = req.body.frameMaterial;
    product.templeMaterial = req.body.templeMaterial;
    product.prescriptionType = req.body.prescriptionType;
    product.frameStyle = req.body.frameStyle;
    product.ProductCollection = req.body.ProductCollection;
    product.warranty = req.body.warranty;
    product.gender = req.body.gender;
    product.height = req.body.height;
    product.condition = req.body.condition;
    product.templeColour = req.body.templeColour;
    product.deliveryTime = req.body.deliveryTime;
    product.price = req.body.price;
    product.discountPrice = req.body.discountPrice;
    product.stockQuantity = req.body.stockQuantity;
    product.images = req.body.images;
    product.isActive = req.body.isActive;
    product.creatorId = req.body.creatorId;
    product.creatorName = req.body.creatorName;
    product.date = req.body.date;

    // // Now save the product
    await product.save();
    res.status(200).json({success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.log('Error updating product', error);
    res.status(500).json({ success: false,error: 'Internal server error' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  console.log(req.body);
  const productId = req.body.id; // Assuming productId comes from body
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log("Error while deleting product", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductByCategoryAndType
};
