import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection function
const connectDB = async () => {
  try {
    // You'll need to add your MongoDB URI to .env file
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/painsense';
    
    await mongoose.connect(MONGO_URI);
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// CORS configuration with detailed options
const corsOptions = {
  origin: function (origin, callback) {
    console.log(`Request origin: ${origin || 'No origin (same origin)'}`);
    // Allow any origin for development
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'Cache-Control', 'X-Requested-With'],
  exposedHeaders: ['x-auth-token']
};

// Middleware
app.use(cors(corsOptions));

// JSON body parser with request logging
app.use(express.json({
  verify: (req, res, buf, encoding) => {
    if (buf && buf.length) {
      try {
        const body = JSON.parse(buf.toString());
        console.log(`Request body to ${req.url}:`, body);
      } catch (e) {
        console.log('Could not log request body (not valid JSON)');
      }
    }
  }
}));

app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World from PainSense Backend API!' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

// Import routes
import authRoutes from './routes/auth.js';
import doctorRoutes from './routes/doctors.js';
import patientRoutes from './routes/patients.js';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});
