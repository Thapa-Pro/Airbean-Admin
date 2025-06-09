const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config(); // Load secret key from .env

// ==========================
// REGISTER NEW USER
// ==========================
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Check if username already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ message: 'Username already taken.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: role || 'user' // default to "user" if no role provided
    });

    res.status(201).json({
      message: 'User registered successfully.',
      userId: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// ==========================
// LOGIN USER AND RETURN TOKEN
// ==========================
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    // Compare plain password to hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful.',
      token,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// ==========================
// GET ALL USERS (Admin only)
// ==========================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from result
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch users.' });
  }
};

// ==========================
// DELETE USER (Admin only)
// BONUS FEATURE – NOT IN EXAM
// ==========================
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user.' });
  }
};
