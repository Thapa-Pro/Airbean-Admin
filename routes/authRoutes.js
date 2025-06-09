const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminMiddleware = require('../middleware/adminMiddleware');

// ==============================
//  PUBLIC ROUTES
// ==============================

// Register a new user
router.post('/register', authController.register);

// Login and receive JWT token
router.post('/login', authController.login);

// ==============================
//  ADMIN-ONLY ROUTES
// ==============================

// Get list of all users (admin only)
router.get('/users', adminMiddleware, authController.getAllUsers);

//  BONUS: Delete a user by ID (admin only)
router.delete('/users/:id', adminMiddleware, authController.deleteUser);

module.exports = router;
