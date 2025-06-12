const jwt = require('jsonwebtoken'); // Import JWT to decode and verify token

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header

  // Check if token is missing or badly formatted
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing or invalid.' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using the secret

    // Check if user role is NOT admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admins only. Access denied.' });
    }

    req.user = decoded; // Pass the user info to the next middleware or route
    next(); // Allow access to the protected route
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};
