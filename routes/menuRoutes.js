const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const adminMiddleware = require('../middleware/adminMiddleware');

// Admin-only routes
router.post('/', adminMiddleware, menuController.addProduct);
router.put('/:id', adminMiddleware, menuController.updateProduct);
router.delete('/:id', adminMiddleware, menuController.deleteProduct);

// Public route
router.get('/', menuController.getAllProducts);

module.exports = router;
