import mongoose from 'mongoose';
import Stock from './models/stock.mjs';

async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb+srv://aman98618:aman98618@cluster0.bnoqctp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function populateItems() {
  const itemsData = [
    { id: '24', key:'24', dishName: 'Coffee', price: 10 },
    { id: '25', key:'25', dishName: 'Cold Drink 250ml', price: 20 },
    { id: '26', key:'26', dishName: 'Cake Rs.10', price: 10 },
    { id: '27', key:'27', dishName: 'Cake Rs.15', price: 15 },
    { id: '28', key:'28', dishName: 'Cake Rs.20', price: 20 },
    { id: '29', key:'29', dishName: 'Cake Rs.25', price: 25 },
    { id: '30', key:'30', dishName: 'Chips Rs.10', price: 10 },
    { id: '31', key:'31', dishName: 'Chocolate Rs.20', price: 20 },
    { id: '32', key:'32', dishName: 'Chocolate Rs.35', price: 35 },
    { id: '33', key:'33', dishName: 'Chocolate Rs.45', price: 45 },
    { id: '34', key:'34', dishName: 'Chocolate Rs.50', price: 50 },
    { id: '35', key:'35', dishName: 'Chocolate Rs.75', price: 75 },
    { id: '36', key:'36', dishName: 'Chocolate Rs.85', price: 85 },
    { id: '37', key:'37', dishName: 'Chocolate Rs.110', price: 110 },
    { id: '38', key:'38', dishName: 'Ice-Cream Rs.10', price: 10 },
    { id: '39', key:'39', dishName: 'Ice-Cream Rs.20', price: 20 },
    { id: '40', key:'40', dishName: 'Ice-Cream Rs.25', price: 25 },
    { id: '41', key:'41', dishName: 'Ice-Cream Rs.30', price: 30 },
    { id: '42', key:'42', dishName: 'Ice-Cream Rs.35', price: 35 },
    { id: '43', key:'43', dishName: 'Ice-Cream Rs.50', price: 50 },
    { id: '44', key:'44', dishName: 'Flavoured Milk', price: 30 },
    { id: '45', key:'45', dishName: 'Lassi', price: 25 },
    { id: '46', key:'46', dishName: 'Chhaachh', price: 15 },
    { id: '47', key:'47', dishName: 'Dosa', price: 40 },
    { id: '48', key:'48', dishName: 'Aloo Paratha', price: 30 },
    { id: '49', key:'49', dishName: 'Sprouts', price: 20 },
    { id: '50', key:'50', dishName: 'Cold Drink 750ml', price: 40 },
    { id: '51', key:'51', dishName: 'Tea', price: 10 },
    { id: '52', key:'52', dishName: 'Dahi', price: 10 },
    { id: '53', key:'53', dishName: 'Mineral Water', price: 20 },
    { id: '54', key:'54', dishName: 'Nescafe Cold Coffee', price: 45 },
    { id: '55', key:'55', dishName: 'Bread Paneer Pakoda', price: 15 },
    { id: '56', key:'56', dishName: 'Gulab Jamun', price: 15 },
    { id: '57', key:'57', dishName: 'Coca Cola 250ml', price: 15 },
    { id: '58', key:'58', dishName: 'Mother Dairy Milkshake', price: 30 },
    { id: '59', key:'59', dishName: 'Chilli Potato', price: 20 },
  ];

  for (let i = 0 ; i <= 35; i++) {

    const newItem = {
      itemid: itemsData[i].id,
      itemName: itemsData[i].dishName,
      quantity: 0, // You can set the initial quantity as needed
      price: itemsData[i].price,
      isAvailable: false, // You can set availability as needed
    };

    
    Stock.insertMany(newItem);
  }


}

async function disconnectFromMongoDB() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}

// Main execution
(async () => {
  await connectToMongoDB();
  await populateItems();
  //await disconnectFromMongoDB();
})();
