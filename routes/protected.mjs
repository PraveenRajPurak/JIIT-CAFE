// routes/protected.mjs
import express from 'express';
import authenticateToken from '../middleware/auth';
import User from '../models/users.mjs'; // Import the User model (adjust the path accordingly)

const router = express.Router();

// Example protected route
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Access the authenticated user's details from req.user
    const userId = req.user.userId;

    // Fetch user details from the database
    const user = await User.findById(userId);

    if (user) {
      // Send user details as the response
      res.status(200).json({
        _id: user._id,
        name: user.name,
        enrollmentNo: user.enrollmentNo,
        jCoins: user.jCoins,
        successfulOrders: user.successfulOrders,
        failedOrders: user.failedOrders,
        pendingOrders: user.pendingOrders,
      });
    } else {
      // If user is not found, return a 404 response
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;