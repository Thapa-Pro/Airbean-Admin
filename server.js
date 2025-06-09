
const connectDB = require('./config/db');
require('dotenv').config(); // Load environment variables
connectDB(); // Connect to the database


// Import the express package
const express = require('express');

// Create an express app
const app = express();

// Define the port number to listen on
const PORT = process.env.PORT || 3000;

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Test route: root URL
app.get('/', (req, res) => {
  res.send('Welcome to Airbean Admin API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
