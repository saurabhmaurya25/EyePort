import express from 'express';
import cors from 'cors';
import './config/mongo.js';
import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoute.js';
import cartRoutes from './routes/cartRoute.js';
import orderRoutes from './routes/orderRoute.js';
import wishlistRoutes from './routes/wishlistRoute.js';

const app = express();

// Middleware
app.use(express.json()); // Handles JSON payloads
app.use(express.urlencoded({ extended: true })); // Handles form submissions

// Configure CORS: Allow specific origin, methods, and headers
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'], // Allow these headers including Authorization
}));

// Logging middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Serve static files for images
app.use("/images", express.static("images"));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth',productRoutes);
app.use('/api/auth',cartRoutes);
app.use('/api/auth',orderRoutes);
app.use('/api/auth',wishlistRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
