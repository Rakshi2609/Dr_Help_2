const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
  try {
    // You'll need to add your MongoDB URI to .env file
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/painsense';
    
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
