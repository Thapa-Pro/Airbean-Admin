// Load environment variables
require('dotenv').config();

// Connect to the database
const connectDB = require('./config/db');
connectDB();

// Import the express package
const express = require('express');
const app = express();

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Import and use auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/api/menu', menuRoutes);

// Test route: root URL
app.get('/', (req, res) => {
  res.send('Welcome to Airbean Admin API!');
});

// Define the port number to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
