const MenuItem = require('../models/menuItem');
const { v4: uuidv4 } = require('uuid');

// Add new product (Admin only)
exports.addProduct = async (req, res) => {
  const { title, desc, price } = req.body;
  if (!title || !desc || !price)
    return res.status(400).json({ message: 'Title, description, and price are required.' });

  try {
    const newItem = await MenuItem.create({
      title,
      desc,
      price,
      prodId: uuidv4(),
      createdAt: new Date(),
    });
    res.status(201).json({ message: 'Product added.', product: newItem });
  } catch (err) {
    if (err.code === 11000) {    //11000 is the error code for "duplicate key error"
      return res.status(409).json ({message: 'Product with this title already exixts in the menu'}); //409 = Conflict
    }
    res.status(500).json({ message: 'Server error.' });
  }
};

// Update existing product (Admin only)
exports.updateProduct = async (req, res) => {
  const { title, desc, price } = req.body;
  const { id } = req.params;
  if (!title || !desc || !price)
    return res.status(400).json({ message: 'Title, desc, and price are required.' });

  try {
    const updated = await MenuItem.findOneAndUpdate(
      { prodId: id },
      { title, desc, price, modifiedAt: new Date() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Product not found.' });
    res.status(200).json({ message: 'Product updated.', product: updated });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Delete a product (Admin only)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await MenuItem.findOneAndDelete({ prodId: id });
    if (!deleted) return res.status(404).json({ message: 'Product not found.' });
    res.status(200).json({ message: 'Product deleted.', product: deleted });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get all products (public)
exports.getAllProducts = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch {
    res.status(500).json({ message: 'Failed to fetch menu.' });
  }
};
