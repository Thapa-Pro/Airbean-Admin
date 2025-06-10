const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, //enumeration is used to restrict a field to a specific set of values.
});

module.exports = mongoose.model('User', userSchema);
