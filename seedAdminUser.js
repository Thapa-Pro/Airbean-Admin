// seedAdminUser.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/user');

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const existing = await User.findOne({ username: 'admin' });
  if (existing) {
    console.log('Admin user already exists.');
    return mongoose.disconnect();
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await User.create({
    username: 'admin',
    password: hashedPassword,
    role: 'admin',
  });

  console.log('✅ Admin user created!');
  mongoose.disconnect();
};

createAdmin();
