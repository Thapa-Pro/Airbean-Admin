const mongoose = require('mongoose');
require('dotenv').config(); // Load MONGO_URI from .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Stop the app if connection fails
  }
};

module.exports = connectDB;
