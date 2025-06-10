const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true},
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  prodId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: null }, // Only added when a product is updated
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
