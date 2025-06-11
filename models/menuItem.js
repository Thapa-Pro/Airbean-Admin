const mongoose = require('mongoose');

// This schema defines the structure of each menu item in the database
const menuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  prodId: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  modifiedAt: Date
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
