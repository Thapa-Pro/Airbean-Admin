const jwt = require('jsonwebtoken'); // Import JWT to verify tokens

// ==========================
// VERIFY USER TOKEN (for any logged-in user)
// ==========================
/*
  This middleware checks if a valid token is included in the request.
  If valid, it attaches the user info to req.user.
  If missing or invalid, it blocks access.
*/
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header

  // If no token or wrong format, block access
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Check if token is valid

    req.user = decoded; // Attach decoded user data to req
    next(); // Let the request continue
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// ==========================
// REQUIRE ADMIN ROLE (extra check)
// ==========================
/*
  This middleware is used after verifyToken to make sure the user is an admin.
  If the role is not "admin", access is denied.
*/
exports.requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }

  next(); // User is admin, allow access
};
