// SelectedItemsContext.js
import React, { createContext, useContext, useState } from 'react';

const SelectedItemsContext = createContext();

const cardData = [
  { id: '1', key:'1', imageUrl: require('./jiitcafeassests/Indian-samosa-chutney.webp'), dishName: 'Samosa', coinCount: 10 },
  { id: '2', key:'2', imageUrl: require('./jiitcafeassests/pasta.png'), dishName: 'Pasta', coinCount: 20 },
  { id: '3', key:'3', imageUrl: require('./jiitcafeassests/patties.png'), dishName: 'Paneer Patty', coinCount: 20 },
  { id: '4', key:'4', imageUrl: require('./jiitcafeassests/noodles.png'), dishName: 'Noodles', coinCount: 20 },
  { id: '5', key:'5', imageUrl: require('./jiitcafeassests/burger.png'), dishName: 'Burger', coinCount: 30 },
  { id: '6', key:'6', imageUrl: require('./jiitcafeassests/hotdog.png'), dishName: 'Hotdog', coinCount: 20 },
  { id: '7', key:'7', imageUrl: require('./jiitcafeassests/Chocolate_5.jpg'), dishName: 'Chocolate Rs.5', coinCount: 5 },
  { id: '8', key:'8', imageUrl: require('./jiitcafeassests/aaloo_bonda.png'), dishName: 'Aaloo Bonda', coinCount: 10 },
  { id: '9', key:'9', imageUrl: require('./jiitcafeassests/aaloo_patties.png'), dishName: 'Aaloo Patty', coinCount: 15 },
  { id: '10', key:'10', imageUrl: require('./jiitcafeassests/sandwich.jpg'), dishName: 'Sandwich', coinCount: 10 },
  { id: '11', key:'11', imageUrl: require('./jiitcafeassests/grilled_sandwich.png'), dishName: 'Grilled Sandwich', coinCount: 20 },
  { id: '12', key:'12', imageUrl: require('./jiitcafeassests/kachori.png'), dishName: 'Kachori', coinCount: 20 },
  { id: '13', key:'13', imageUrl: require('./jiitcafeassests/idli.png'), dishName: 'Idli Sambhar', coinCount: 30 },
  { id: '14', key:'14', imageUrl: require('./jiitcafeassests/maggi.png'), dishName: 'Maggi', coinCount: 30 },
  { id: '15', key:'15', imageUrl: require('./jiitcafeassests/paneer_kulcha.png'), dishName: 'Paneer Kulcha', coinCount: 30 },
  { id: '16', key:'16', imageUrl: require('./jiitcafeassests/pav_bhaji.png'), dishName: 'Pav Bhaji', coinCount: 35 },
  { id: '17', key:'17', imageUrl: require('./jiitcafeassests/biscuit.png'), dishName: 'Biscuit', coinCount: 10 },
  { id: '18', key:'18', imageUrl: require('./jiitcafeassests/dairy_milk.png'), dishName: 'Chocolate Rs.10', coinCount: 10 },
  { id: '19', key:'19', imageUrl: require('./jiitcafeassests/kurkure.png'), dishName: 'Kurkure', coinCount: 20 },
  { id: '20', key:'20', imageUrl: require('./jiitcafeassests/lays.png'), dishName: 'Lays', coinCount: 20 },
  { id: '21', key:'21', imageUrl: require('./jiitcafeassests/Appy_Frooti.png'), dishName: 'Appy/Frooti', coinCount: 10 },
  { id: '22', key:'23', imageUrl: require('./jiitcafeassests/milkshake.png'), dishName: 'Cavin Milkshake', coinCount: 40 },
  { id: '23', key:'22', imageUrl: require('./jiitcafeassests/tropicana.png'), dishName: 'Tropicana', coinCount: 20 },
  { id: '24', key:'24', imageUrl: require('./jiitcafeassests/Coffee.jpg'), dishName: 'Coffee', coinCount: 10 },
  { id: '25', key:'25', imageUrl: require('./jiitcafeassests/Cold_Drink_20.jpg'), dishName: 'Cold Drink 250ml', coinCount: 20 },
  { id: '26', key:'26', imageUrl: require('./jiitcafeassests/Cake_10.jpg'), dishName: 'Cake Rs.10', coinCount: 10 },
  { id: '27', key:'27', imageUrl: require('./jiitcafeassests/Cake_15.png'), dishName: 'Cake Rs.15', coinCount: 15 },
  { id: '28', key:'28', imageUrl: require('./jiitcafeassests/Cake_20.jpg'), dishName: 'Cake Rs.20', coinCount: 20 },
  { id: '29', key:'29', imageUrl: require('./jiitcafeassests/Cake_25.png'), dishName: 'Cake Rs.25', coinCount: 25 },
  { id: '30', key:'30', imageUrl: require('./jiitcafeassests/Chips_10.jpg'), dishName: 'Chips Rs.10', coinCount: 10 },
  { id: '31', key:'31', imageUrl: require('./jiitcafeassests/Chocolate_20.jpg'), dishName: 'Chocolate Rs.20', coinCount: 20 },
  { id: '32', key:'32', imageUrl: require('./jiitcafeassests/Chocolate_35.jpg'), dishName: 'Chocolate Rs.35', coinCount: 35 },
  { id: '33', key:'33', imageUrl: require('./jiitcafeassests/Chocolate_45.jpg'), dishName: 'Chocolate Rs.45', coinCount: 45 },
  { id: '34', key:'34', imageUrl: require('./jiitcafeassests/Chocolate_50.jpg'), dishName: 'Chocolate Rs.50', coinCount: 50 },
  { id: '35', key:'35', imageUrl: require('./jiitcafeassests/Chocolate_75.jpg'), dishName: 'Chocolate Rs.75', coinCount: 75 },
  { id: '36', key:'36', imageUrl: require('./jiitcafeassests/CHOCOLATE_85.jpg'), dishName: 'Chocolate Rs.85', coinCount: 85 },
  { id: '37', key:'37', imageUrl: require('./jiitcafeassests/chocolate_110.png'), dishName: 'Chocolate Rs.110', coinCount: 110 },
  { id: '38', key:'38', imageUrl: require('./jiitcafeassests/Ice_Cream_10.png'), dishName: 'Ice-Cream Rs.10', coinCount: 10 },
  { id: '39', key:'39', imageUrl: require('./jiitcafeassests/Ice_Cream_20.png'), dishName: 'Ice-Cream Rs.20', coinCount: 20 },
  { id: '40', key:'40', imageUrl: require('./jiitcafeassests/Ice_Cream_25.jpg'), dishName: 'Ice-Cream Rs.25', coinCount: 25 },
  { id: '41', key:'41', imageUrl: require('./jiitcafeassests/Ice_Cream_30.png'), dishName: 'Ice-Cream Rs.30', coinCount: 30 },
  { id: '42', key:'42', imageUrl: require('./jiitcafeassests/Ice_Cream_35.png'), dishName: 'Ice-Cream Rs.35', coinCount: 35 },
  { id: '43', key:'43', imageUrl: require('./jiitcafeassests/Ice_Cream_50.jpg'), dishName: 'Ice-Cream Rs.50', coinCount: 50 },
  { id: '44', key:'44', imageUrl: require('./jiitcafeassests/Flavoured_Milk.jpg'), dishName: 'Flavoured Milk', coinCount: 30 },
  { id: '45', key:'45', imageUrl: require('./jiitcafeassests/Lassi.jpg'), dishName: 'Lassi', coinCount: 25 },
  { id: '46', key:'46', imageUrl: require('./jiitcafeassests/Chhachh.jpg'), dishName: 'Chhaachh', coinCount: 15 },
  { id: '47', key:'47', imageUrl: require('./jiitcafeassests/Dosa.png'), dishName: 'Dosa', coinCount: 40 },
  { id: '48', key:'48', imageUrl: require('./jiitcafeassests/Aloo_Paratha.png'), dishName: 'Aloo Paratha', coinCount: 30 },
  { id: '49', key:'49', imageUrl: require('./jiitcafeassests/Sprouts.png'), dishName: 'Sprouts', coinCount: 20 },
  { id: '50', key:'50', imageUrl: require('./jiitcafeassests/Cold_Drink_40.png'), dishName: 'Cold Drink 750ml', coinCount: 40 },
  { id: '51', key:'51', imageUrl: require('./jiitcafeassests/Tea.jpg'), dishName: 'Tea', coinCount: 10 },
  { id: '52', key:'52', imageUrl: require('./jiitcafeassests/Dahi_10.jpg'), dishName: 'Dahi', coinCount: 10 },
  { id: '53', key:'53', imageUrl: require('./jiitcafeassests/Mineral_Water.jpg'), dishName: 'Mineral Water', coinCount: 20 },
  { id: '54', key:'54', imageUrl: require('./jiitcafeassests/Nescafe.png'), dishName: 'Nescafe Cold Coffee', coinCount: 45 },
  { id: '55', key:'55', imageUrl: require('./jiitcafeassests/Bread_Pakoda.jpg'), dishName: 'Bread Paneer Pakoda', coinCount: 15 },
  { id: '56', key:'56', imageUrl: require('./jiitcafeassests/Gulab_Jamun.jpg'), dishName: 'Gulab Jamun', coinCount: 15 },
  { id: '57', key:'57', imageUrl: require('./jiitcafeassests/Coca_Cola_15.jpg'), dishName: 'Coca Cola 250ml', coinCount: 15 },
  { id: '58', key:'58', imageUrl: require('./jiitcafeassests/Mother_Dairy_Milkshake.png'), dishName: 'Mother Dairy Milkshake', coinCount: 30 },
  { id: '59', key:'59', imageUrl: require('./jiitcafeassests/Chilli_potato.png'), dishName: 'Chilli Potato', coinCount: 20 },
  { id: '60', key:'60', imageUrl: require('./jiitcafeassests/Ice_Cream_40.png'), dishName: 'Ice-Cream Rs.40', coinCount: 40 },
  // Add more card data as needed
];

export function useSelectedItems() {
  return useContext(SelectedItemsContext);
}

export function SelectedItemsProvider({ children, onCartChange }) {
  
  const [selectedItems, setSelectedItems] = useState([]);

  const generateUniqueKey = () => {
    return `${Math.random().toString(36).substring(2, 9)}`;
  };

  const addOrUpdateItemInCart = (itemId) => {
    // Check if the item with the same id already exists in the cart
    const itemIndex = selectedItems.findIndex((item) => item.id === itemId);
  
    if (itemIndex !== -1) {
      // If the item exists, increment its count
      const updatedItems = [...selectedItems];
      updatedItems[itemIndex].count += 1;
      setSelectedItems(updatedItems);
    } else {
      // If the item doesn't exist, add it to the cart with a count of 1
      const newItem = { id: itemId, count: 1, key: generateUniqueKey() };
      console.log('Adding item to selectedItems:', newItem);
      setSelectedItems([...selectedItems, newItem]);
    }
  
    console.log('Selected Items after addOrUpdateItemInCart:', selectedItems);
  };
  
  
  const removeItemFromCart = (itemId) => {
    console.log('Removing item with id:', itemId);
    setSelectedItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
  
      // Update the cardData array if needed
      cardData.forEach((item) => {
        const count = updatedItems.find((selectedItem) => selectedItem.id === item.id)?.count || 0;
        item.count = count;
      });
  
      console.log('Selected Items after removeItemFromCart:', updatedItems);
      return updatedItems;
    });
  };

  

  return (
    <SelectedItemsContext.Provider value={{ selectedItems, cardData, setSelectedItems, addOrUpdateItemInCart, removeItemFromCart, useSelectedItems ,generateUniqueKey }}>
      {children}
    </SelectedItemsContext.Provider>
  );
}
