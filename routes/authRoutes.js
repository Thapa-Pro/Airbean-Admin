const express = require('express'); // Import Express to create router
const router = express.Router(); // Create a new router

const authController = require('../controllers/authController'); // Import controller with register/login logic
const adminMiddleware = require('../middleware/adminMiddleware'); // Import middleware to protect admin-only routes

// ==========================
// REGISTER NEW USER (public)
// ==========================
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing fields
 *       409:
 *         description: Username already taken
 *       500:
 *         description: Server error
 */
router.post('/register', authController.register);

// ==========================
// LOGIN USER AND RETURN TOKEN (public)
// ==========================
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and get token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', authController.login);

// ==========================
// GET ALL USERS (admin only)
// ==========================
/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access only
 *       500:
 *         description: Server error
 */
router.get('/users', adminMiddleware, authController.getAllUsers);

// ==========================
// DELETE USER BY ID (admin only)
// ==========================
/**
 * @swagger
 * /api/auth/users/{id}:
 *   delete:
 *     summary: Delete user by ID (admin only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB user _id
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 * 
 *                # Originally I used 403 for "Admin only", but reused for protected admin accounts
 *                # because Swagger only allows one 403 entry per route.
 *                # This shows the extra check I added to block deletion of "admin" or "JesperN" accounts.
 *       403:
 *         description: Forbidden – cannot delete protected admin account
 * 
 *       500:
 *         description: Server error
 */
router.delete('/users/:id', adminMiddleware, authController.deleteUser);

module.exports = router; // Export router to use in server.js
