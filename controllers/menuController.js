const MenuItem = require('../models/menuItem');
const { v4: uuidv4 } = require('uuid');

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
