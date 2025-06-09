const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const adminMiddleware = require('../middleware/adminMiddleware');

// Protected by admin
router.post('/', adminMiddleware, menuController.addProduct);
router.put('/:id', adminMiddleware, menuController.updateProduct);
router.delete('/:id', adminMiddleware, menuController.deleteProduct);

// Public route
router.get('/', menuController.getAllProducts);

module.exports = router;
