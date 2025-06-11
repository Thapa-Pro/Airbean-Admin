const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  prodId: String,
  createdAt: Date,
  modifiedAt: Date
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
