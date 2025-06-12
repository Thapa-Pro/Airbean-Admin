const mongoose = require('mongoose'); // Import mongoose to connect to MongoDB

const dotenv = require('dotenv'); // Load environment variables from .env file

const bcrypt = require('bcrypt'); // Import bcrypt to hash the password

const User = require('./models/user'); // Import the User model to create the admin

dotenv.config(); // Load .env configuration (MONGO_URI)

// ==========================
// CREATE ADMIN USER
// ==========================
/*
  This script connects to the database and creates an admin user.
  If the admin already exists, it will not create a duplicate.
*/
const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB

    // Check if an admin already exists
    const existing = await User.findOne({ username: 'admin' });

    if (existing) {
      console.log('Admin user already exists.');
      return mongoose.disconnect(); // Exit if already created
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create the admin user
    await User.create({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Admin user created!');
    mongoose.disconnect(); // Close the database connection
  } catch (err) {
    console.error('❌ Failed to create admin user:', err.message);
    mongoose.disconnect();
  }
};

createAdmin(); // Run the function
