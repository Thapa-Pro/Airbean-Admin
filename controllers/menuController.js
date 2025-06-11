// I import the MenuItem model to talk to the menu collection in MongoDB
const MenuItem = require('../models/menuItem');

// I import uuid to generate unique IDs for each product
const { v4: uuidv4 } = require('uuid');

// ==========================
// ADD NEW PRODUCT
// ==========================
/*
  This function adds a new product to the menu.
  It needs title, desc, and price from the request body.
  It also creates prodId and createdAt automatically.
*/
exports.addProduct = async (req, res) => {
  const { title, desc, price } = req.body;

  if (!title || !desc || !price) {
    return res.status(400).json({ message: 'Title, desc, and price are required.' });
  }

  try {
    const newItem = await MenuItem.create({
      title,
      desc,
      price,
      prodId: uuidv4(),
      createdAt: new Date()
    });

    res.status(201).json({ message: 'Product added.', product: newItem });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// ==========================
// UPDATE A PRODUCT BY prodId
// ==========================
/*
  This function updates an existing product by its prodId.
  It also adds a modifiedAt timestamp when the product is changed.
*/
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, desc, price } = req.body;

  if (!title || !desc || !price) {
    return res.status(400).json({ message: 'Title, desc, and price are required.' });
  }

  try {
    const updatedProduct = await MenuItem.findOneAndUpdate(
      { prodId: id },
      {
        title,
        desc,
        price,
        modifiedAt: new Date()
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product updated.', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// ==========================
// DELETE A PRODUCT BY prodId
// ==========================
/*
  This function deletes a product by its prodId.
  If the product is not found, it returns a 404 error.
*/
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await MenuItem.findOneAndDelete({ prodId: id });

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// ==========================
// GET ALL PRODUCTS (Public)
// ==========================
/*
  This function returns all products from the menu.
  It's used in the public GET /api/menu route.
*/
exports.getAllProducts = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};
