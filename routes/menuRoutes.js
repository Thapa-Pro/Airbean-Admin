const express = require('express');
const router = express.Router();

// I import the controller where all the logic is
const menuController = require('../controllers/menuController');

// I use this middleware to protect admin-only routes
const adminMiddleware = require('../middleware/adminMiddleware');

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Add a new product to the menu
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, desc, price]
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product added
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       500:
 *         description: Server error
 */
router.post('/', adminMiddleware, menuController.addProduct);

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get all products
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Returns all products from the menu
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.get('/', menuController.getAllProducts);

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID (prodId)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, desc, price]
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized (token missing/invalid)
 *       403:
 *         description: Admin only
 *       404:
 *         description: Product not found
 */
router.put('/:id', adminMiddleware, menuController.updateProduct);

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID (prodId)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Product not found
 */
router.delete('/:id', adminMiddleware, menuController.deleteProduct);

module.exports = router;
