// Script to reset a user's password in the MongoDB database
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import readline from 'readline';

// Load environment variables
dotenv.config();

// Import User model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/painsense');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

// Function to reset password
const resetPassword = async (email, newPassword) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`No user found with email: ${email}`);
      return false;
    }
    
    // Update the password
    user.password = newPassword;
    await user.save();
    
    console.log(`Password successfully reset for user: ${email}`);
    return true;
  } catch (err) {
    console.error(`Error resetting password: ${err.message}`);
    return false;
  }
};

// Main function
const main = async () => {
  // Connect to database
  const connected = await connectDB();
  if (!connected) return;
  
  // Prompt for email
  rl.question('Enter the user\'s email: ', (email) => {
    // Prompt for new password
    rl.question('Enter the new password: ', async (newPassword) => {
      // Reset the password
      await resetPassword(email, newPassword);
      
      // Close the connection and exit
      mongoose.connection.close();
      rl.close();
    });
  });
};

// Run the script
main();

// Usage instructions (comment out when running the script)
console.log('=== Password Reset Script ===');
console.log('This script allows you to reset a user\'s password in the database.');
console.log('To run: node reset-password.js');
console.log('You will be prompted for the user\'s email and the new password.');
