// routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users.mjs';
import SuccessOrders from '../models/successfulOrders.mjs';
import FailedOrders from '../models/failedOrders.mjs';
import PendingOrders from '../models/pendingOrders.mjs';
import authenticateToken from '../middleware/auth.mjs';
import crypto from 'crypto';
const router = express.Router();

// Function to generate a random alphanumeric string
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomString = Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((byte) => characters[byte % characters.length])
    .join('');
  return randomString;
};

// Secret key for signing JWT tokens
const JWT_SECRET = 'helloworld';

// Signup route
router.post('/signup', async (req, res) => {
  const { name, enrollmentNo, password } = req.body;

  try {
    const existingUser = await User.findOne({ enrollmentNo });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({
      name,
      enrollmentNo,
      password,
    });

    // Set default values for additional fields
    newUser.jCoins = 0;
    newUser.successfulOrders = [];
    newUser.failedOrders = [];
    newUser.pendingOrders = [];

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Signin route
router.post('/signin', async (req, res) => {
  console.log('Received request at /signin');
  const { enrollmentNo, password } = req.body;

  try {
    const user = await User.findOne({ enrollmentNo, password });
    if (user) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      console.log('Token generated:', token);
      
      // Send additional user details and the token
      const { _id, name, jCoins, successfulOrders, failedOrders, pendingOrders } = user;
      res.status(200).json({
        message: 'Login successful',
        user: { _id, name, enrollmentNo, jCoins, successfulOrders, failedOrders, pendingOrders },
        token,
      });

    } else {
      console.log('Invalid credentials');
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.post('/placeorder', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  console.log('User ID:', userId);

  try {
    const user = await User.findById(userId);

    if (user) {
      const { selectedItems } = req.body;
      console.log(selectedItems);

      const orderId = generateRandomString(5);

      const newOrderForUser = {
        orderId: orderId,
        orderDate: new Date(),
        items: selectedItems.map(item => ({
          id: item.id,
          dishName: item.dishName,
          coinCount: item.coinCount,
          count: item.count,
          imageUrl: item.imageUrl,
          key: item.key,
        })),
      };

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: { pendingOrders: newOrderForUser },
        },
        { new: true }
      );

      const newOrderForPendingOrdersCollection = {
        orderId: orderId,
        orderDate: new Date(),
        orderedBy: [{ name: user.name, enrollmentNo: user.enrollmentNo }],
        items: selectedItems.map(item => ({
          id: item.id,
          dishName: item.dishName,
          coinCount: item.coinCount,
          count: item.count,
          imageUrl: item.imageUrl,
          key: item.key,
        })),
      };

      await PendingOrders.create(newOrderForPendingOrdersCollection);

      setTimeout(async () => {
        await FailedOrders.create(newOrderForPendingOrdersCollection);

        await PendingOrders.findOneAndDelete({ orderId: orderId });

        await User.findByIdAndUpdate(userId, {
          $pull: { pendingOrders: { orderId: orderId } },
          $push: { failedOrders: newOrderForUser },
        });
      }, 15 * 60 * 1000); 

      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





router.get('/pendingOrders', authenticateToken, async (req, res) => {
  console.log('Received request at /pendingOrders');
  const userId = req.user.userId;
  console.log('User ID:', userId);

  try {
    const user = await User.findById(userId);
    if (user) {
      console.log('User found:', user);

      const ordersWithDetails = user.pendingOrders.map(order => ({
        _id: order._id,
        orderDate: order.orderDate,
        orderId: order.orderId,
        items: order.items.map(item => ({
          dishName: item.dishName,
          coinCount: item.coinCount,
          count: item.count,
          imageUrl: item.imageUrl,
          key: item.key,
          id: item.id,
        }))
      }));

      res.status(200).json(ordersWithDetails);
      console.log('Pending orders:', ordersWithDetails);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching pending orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/userorders', authenticateToken, async (req, res) => {
  console.log('Received request at /userorders');
  const userId = req.user.userId;
  console.log('User ID:', userId);
  
  try {

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = {
      successfulOrders: user.successfulOrders,
      pendingOrders: user.pendingOrders,
      failedOrders: user.failedOrders,
    };

    res.json(userData);

  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/alluserorders', authenticateToken, async (req, res) => {
  console.log('Received request at /alluserorders');
  const userId = req.user.userId; // Assuming the user is available in req.user after authentication
  console.log('User ID:', userId);
  try {
    const user = await User.findById(userId);

      console.log('populated');
      console.log(user);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Add a status field to each order in the arrays
    const allOrders = [
      ...user.pendingOrders.map(order => ({ ...order.toObject(), status: 'pending' })),
      ...user.failedOrders.map(order => ({ ...order.toObject(), status: 'failed' })),
      ...user.successfulOrders.map(order => ({ ...order.toObject(), status: 'successful' })),
    ];

    console.log('All orders:', allOrders);

    res.json(allOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
