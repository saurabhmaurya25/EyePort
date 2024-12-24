import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

const uri = process.env.MONGODB_URI;  // Get the MongoDB URI from environment variables

if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined");
}

mongoose.connect(uri)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});


