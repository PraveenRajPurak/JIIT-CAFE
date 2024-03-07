import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Cards } from './components/cards.js';
import { NativeBaseProvider, Box, Center } from "native-base";
import { FlatList } from 'react-native';
import { BottomTabUser } from './components/bottomTabUser.js';
import TokenPopup from './Tokenpopup';
import OrderList from './orderList.js';
import maintokenpage from './maintokenpage.js';
import { useUser } from './userContext';
import OrderPopup from './OrderPopup.js';
export default function OrderUser() {

  const [isTokenPopupVisible, setTokenPopupVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = useUser();

  useEffect(() => {
    if (route.params?.showTokenPopup) {
      setTokenPopupVisible(true);
    }

    fetchOrders();
  }, [route.params]);

  const fetchOrders = async () => {
    try {
      const { token } = userData;
      console.log('Token call from orderUser page :', token);
      // Fetch user data with orders
      const response = await fetch('http://192.168.177.64:3000/auth/alluserorders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('userData', userData);
        if (userData && userData.successfulOrders && userData.failedOrders && userData.pendingOrders) {

          // Extract orders from all three arrays
          const allOrders = [
            ...userData.successfulOrders.map(order => ({ ...order, status: 'successful' })),
            ...userData.failedOrders.map(order => ({ ...order, status: 'failed' })),
            ...userData.pendingOrders.map(order => ({ ...order, status: 'pending' })),
          ];

          setOrders(prevOrders => [...prevOrders, ...allOrders]);
        }
        else {
          console.error('Unexpected structure of userData. Unable to fetch orders.');
        }
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderHeaderText}>{`Order ID: ${item.orderId}`}</Text>
        <Text style={styles.orderHeaderText}>{`Order Date: ${item.orderDate}`}</Text>
        <Text style={styles.orderStatus}>{`Status: ${item.status}`}</Text>
      </View>

      <View style={styles.orderItems}>
        <Text style={styles.orderItemsHeader}>Ordered Items:</Text>
        {item.items.map((orderedItem, index) => (
          <View key={index} style={styles.orderedItem}>
            <Text>{`${orderedItem.count} X ${orderedItem.dishName}`}</Text>
            <Text>{`${orderedItem.coinCount * orderedItem.count}`} JCoins</Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.orderFooterText}>Total Coins: {calculateTotalCoins(item.items)}</Text>
        {item.status === 'pending' && (
          <Text style={styles.orderFooterText}>{`Time Left: ${formatTime(item.timer)}`}</Text>
        )}
      </View>
    </View>
  );

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  }

  const [item, searchItem] = useState('');

  const search = (newText) => {
    newText = truncateText(newText, 10);
    searchItem(newText);
  };

  const cardData = [
    { id: '1', imageUrl: require('./jiitcafeassests/Indian-samosa-chutney.webp'), dishName: 'Samosa', coinCount: '10' },
    { id: '2', imageUrl: require('./jiitcafeassests/pasta.png'), dishName: 'Pasta', coinCount: '20' },
    { id: '3', imageUrl: require('./jiitcafeassests/patties.png'), dishName: 'Patty', coinCount: '10' },
    // Add more card data as needed
  ];

  const renderCard = ({ item }) => (
    <Cards imageUrl={item.imageUrl} keyExtractor={item.id} dishName={item.dishName} coinCount={item.coinCount} />
  );


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always'
      keyboardVerticalOffset={-500}
    >
      <SafeAreaView>
     
        {isTokenPopupVisible ? (
          <>
            <TokenPopup  isVisible={isTokenPopupVisible} onClose={() => setTokenPopupVisible(false)} />
            
          </>
        ) : (
          <>
            <FlatList
              data={orders}
              renderItem={renderOrder}
              keyExtractor={(item) => item.orderId.toString()}
            />
            <StatusBar style="auto" />
          </>
        )}
      </SafeAreaView>
      <NativeBaseProvider>
        <BottomTabUser focussedIndex={1} />
      </NativeBaseProvider>
    </KeyboardAvoidingView>


  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },

  curvedLine: {
    position: 'absolute',
    top: 50,
    width: '89%',
    height: '3%',
    borderTopWidth: 2.5,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
    borderRadius: 20,
    borderTopColor: 'black',
    borderRightColor: 'white',
    borderLeftColor: 'white',
  },


  roundedBox: {
    position: 'absolute', // Change the position to absolute
    bottom: 230,
    width: 350, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    backgroundColor: 'aqua', // Background color of the box
    borderRadius: 30, // Adjust the borderRadius to control the roundness
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },

  fields: {
    position: 'absolute', // Change the position to absolute
    bottom: 380,
    right: 30,
    width: 250, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    backgroundColor: 'black', // Background color of the box
    borderRadius: 30, // Adjust the borderRadius to control the roundness
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },

  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },


});