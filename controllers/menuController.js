// I import the MenuItem model to talk to the menu collection in MongoDB
const MenuItem = require('../models/menuItem');

// I import uuid to generate unique IDs for each product
const { v4: uuidv4 } = require('uuid');

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


    res.status(500).json({ message: 'Server error.' });
  }
};


    res.status(500).json({ message: 'Server error.' });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);

  }
};
