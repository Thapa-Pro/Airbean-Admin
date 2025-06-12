
const bcrypt = require('bcrypt'); // Import bcrypt for password encryption

const jwt = require('jsonwebtoken'); // Import JWT to create and verify tokens

const User = require('../models/user'); // Import the User model to talk to the users collection in MongoDB

require('dotenv').config(); // Load the secret key from the .env file

// ==========================
// REGISTER NEW USER
// ==========================
/*
  This function registers a new user.
  It needs username and password from req.body.
  It hashes the password and stores the user in the database.
*/
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  // Check if required fields are missing
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

    // Disallow Swagger defaults (common mistake)
  if (username === 'string' || password === 'string') {
  return res.status(400).json({ message: 'Please enter a real username and password.' });
}


  try {
    // Check if a user with the same username already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(409).json({ message: 'Username already taken.' });
    }

    // Hash the plain password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: role || 'user' // If role is not provided, default to "user"
    });

    res.status(201).json({
      message: 'User registered successfully.',
      userId: newUser._id
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// ==========================
// LOGIN USER AND RETURN TOKEN
// ==========================
/*
  This function logs in an existing user.
  It checks the credentials and returns a JWT token.
*/
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Check if both fields are filled
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Try to find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare the provided password with the hashed one
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Create a token with user ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token is valid for 1 hour
    );

    res.status(200).json({
      message: 'Login successful.',
      token, // You will use this token in frontend or Insomnia
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// ==========================
// GET ALL USERS (Admin only)
// ==========================
/*
  This function returns a list of all users.
  Only admins are allowed to access this route.
  Passwords are not included in the response.
*/
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users, but don't show the password field
    const users = await User.find().select('-password');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch users.' });
  }
};

// ==========================
// DELETE A USER BY ID (Admin only)
// ==========================
/*
  This function deletes a user by MongoDB _id.
  Admins can use this to manage users.
  Protected accounts like "admin" or "JesperN" can't be deleted.
*/
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Try to find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Prevent deletion of important admin accounts
    if (user.username === 'admin' || user.username === 'JesperN') {
      return res.status(403).json({ message: 'Protected account. Cannot be deleted.' });
    }

    // Delete the user
    await user.deleteOne();

    res.status(200).json({ message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};
