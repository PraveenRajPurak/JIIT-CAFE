// middleware/auth.mjs
import jwt from 'jsonwebtoken';

// Secret key for signing JWT tokens
const JWT_SECRET = 'helloworld';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    console.log('Received Token in Middleware:', token);
  
    if (!token) return res.status(401).json({ message: 'Access denied' });
  
    try {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error('Token verification error:', err);
          return res.status(403).json({ message: 'Invalid token' });
        }
  
        // Log the decoded token and user ID
        console.log('Decoded Token:', decoded);
        console.log('Decoded User ID:', decoded.userId);
  
        // Assign the decoded user ID to req.user.userId
        Object.defineProperty(req, 'user', { value: { userId: decoded.userId }, writable: true });
  
        next();
      });
    } catch (error) {
      console.error('Error during token verification:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

export default authenticateToken;



