// routes/adminAuth.mjs

import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/admins.mjs';
import Stock from '../models/stock.mjs';
import User from '../models/users.mjs';
import PendingOrders from '../models/pendingOrders.mjs';
import CompletedOrders from '../models/successfulOrders.mjs';
import FailedOrders from '../models/failedOrders.mjs';

const router = express.Router();

const JWT_ADMIN_SECRET = 'helloworld';

router.post('/signIn', async (req, res) => {
  console.log('inside admin signup route');
  const { adminNo, password } = req.body;
  console.log('adminNo:', adminNo);
  console.log('password:', password);
  try {
    const admin = await Admin.findOne({ adminNo, password });
    if (admin) {
      // Generate JWT token for admin
      const token = jwt.sign({ adminId: admin._id }, JWT_ADMIN_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        message: 'Admin login successful',
        admin: { adminId: admin._id, adminNo: admin.adminNo },
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/stockfetch', async (req, res) => {
  try {
    let query = {}; // Default query to fetch all items

    // Check if search query is provided
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query = {
        $or: [
          { itemName: { $regex: searchRegex } },
          { itemid: { $regex: searchRegex } },
        ],
      };
    }

    const stockItems = await Stock.find(query);
    res.json(stockItems);
  } catch (error) {
    console.error('Error fetching stockish items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/addStock', async (req, res) => {
  const { itemId, updatedStock } = req.body;

  try {
    const item = await Stock.findOne({ itemid: itemId });
    
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    // Find the stock item by itemId and update the quantity
    const updatedItem = await Stock.findOneAndUpdate(
      { itemid: itemId },
      { 
        quantity: item.quantity + updatedStock,
        isAvailable: item.quantity + updatedStock > 0 ? true : false,
      },
      { new: true }
    );

    res.json({ success: true, updatedItem });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.post('/deleteStock', async (req, res) => {
  const { itemId, deletedStock } = req.body;

  try {
    const item = await Stock.findOne({ itemid: itemId });
    
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    // Ensure that item.quantity is a valid number
    const currentQuantity = typeof item.quantity === 'number' ? item.quantity : 0;

    // Find the stock item by itemId and update the quantity
    const updatedItem = await Stock.findOneAndUpdate(
      { itemid: itemId },
      { 
        quantity: Math.max(currentQuantity - deletedStock, 0),
        isAvailable: Math.max(currentQuantity - deletedStock, 0) > 0 ? true : false,
      },
      { new: true }
    );

    res.json({ success: true, updatedItem });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.post('/userDetails', async (req, res) => {
  const enrollmentNo = req.body.enrollmentNo;
  console.log('enrollmentNo:', enrollmentNo);

  try {
    // Fetch user details based on the user ID
    const user = await User.findOne({ enrollmentNo: enrollmentNo });

    if (user) {
      // Send user details as the response
      res.status(200).json({
        enrollmentNo: user.enrollmentNo,
        name: user.name,
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


router.post('/rechargeJCoins', async (req, res) => {
  const { enrollmentNo, amount } = req.body;

  try {
    // Fetch user details based on the user ID
    const user = await User.findOne({ enrollmentNo: enrollmentNo });

    if (user) {
      const oldJcoins = user.jCoins;
      const updatedUser = await User.findOneAndUpdate(
        { enrollmentNo: enrollmentNo }, // Criteria for finding the document
        { $set: { jCoins: oldJcoins + amount } }, // Update operation
        { new: true }
      );

      res.status(200).json({
        enrollmentNo: updatedUser.enrollmentNo,
        name: updatedUser.name,
        jCoins: updatedUser.jCoins,
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error recharging JCoins:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/fetchPendingOrders', async (req, res) => {
  try {
    const pendingOrders = await PendingOrders.find({}, '_id orderId orderDate orderTime orderedBy items');

    if (pendingOrders) {
      // Convert date strings to Date objects for proper sorting
      const sortedOrders = pendingOrders.map(order => {
        return {
          _id: order._id,
          orderId: order.orderId,
          orderDate: new Date(order.orderDate),
          orderTime: order.orderTime,
          orderedBy: order.orderedBy,
          items: order.items,
        };
      });

      // Sort the orders based on orderDate and orderTime
      sortedOrders.sort((a, b) => b.orderDate - a.orderDate || a.orderTime.localeCompare(b.orderTime));

      res.status(200).json(sortedOrders);
    } else {
      res.status(404).json({ error: 'No pending orders found' });
    }
  } catch (error) {
    console.error('Error fetching pending orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/completeOrder', async (req, res) => {
  console.log('Received request at /completeOrder');
  const { orderId } = req.body;
  const {orderedBy} = req.body;
  console.log('Order ID:', orderId);
  console.log('Ordered By:', orderedBy);

  try {
    
    const user = await User.findOne({ enrollmentNo : orderedBy });

    const pendingOrder = await PendingOrders.findOne({ orderId : orderId });

    // Find the order in user's pendingOrders array based on orderId
    const userPendingOrderIndex = user.pendingOrders.findIndex(order => order.orderId === orderId);

    if (userPendingOrderIndex === -1) {
      return res.status(404).json({ error: 'Order not found in user\'s pending orders' });
    }
    
    // Get the pending order
    const userPendingOrder = user.pendingOrders[userPendingOrderIndex];

    if (!pendingOrder) {
      return res.status(404).json({ error: 'Order not found in Pending Orders' });
    }

    // Move order to CompletedOrders collection
    const completedOrder = new CompletedOrders({
      orderId: pendingOrder.orderId,
      orderDate: pendingOrder.orderDate,
      orderTime: pendingOrder.orderTime,
      orderedBy: pendingOrder.orderedBy,
      items: pendingOrder.items,
    });

    await completedOrder.save();

    user.successfulOrders.push(userPendingOrder);
    user.pendingOrders.splice(userPendingOrderIndex, 1);

    await PendingOrders.deleteOne({ orderId });

    await user.save();

    res.status(200).json({ message: 'Order completed successfully' });
  } catch (error) {
    console.error('Error completing order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/successfulOrdersFetch', async (req, res) => {
  console.log('Received request at /successfulOrdersFetch');
  try {
    const orders = await CompletedOrders.find({}, '_id orderId orderDate orderTime orderedBy items');
    console.log('Orders:', orders);

    res.json(orders);

  } catch (error) {
    console.error('Error fetching successful orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/failedOrdersFetch', async (req, res) => {
  console.log('Received request at /failedOrdersFetch');
  try {
    const orders = await FailedOrders.find({}, '_id orderId orderDate orderTime orderedBy items');
    console.log('Orders:', orders);

    res.json(orders);

  } catch (error) {
    console.error('Error fetching failed orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
