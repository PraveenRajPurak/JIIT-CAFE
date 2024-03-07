// routes/user.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users.mjs';
import stocks from '../models/stock.mjs';
import authenticateToken from '../middleware/auth.mjs'; // Import the middleware

const router = express.Router();

router.post('/checkItemAvailability', async (req, res) => {
  console.log('Received request at /checkItemAvailability');
  const { itemId } = req.body;
  console.log('Item ID:', itemId);

  try {
    const item = await stocks.find({ itemid: itemId });

    if (item && item.isAvailable != null) {
      const isAvailable = item.isAvailable;
      console.log('Item availability:', isAvailable);
      res.json({ isAvailable });
    } else {
      // Handle the case where item or item.isAvailable is null
      res.status(404).json({ error: 'Item not found or availability information missing' });
    }
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/details', authenticateToken, async (req, res) => {
  console.log('Received request at /details');
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json({
        jCoins: user.jCoins,
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







export default router;
