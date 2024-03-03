import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelectedItems } from './SelectedItemsContext.js';
import { useUser } from './userContext.js';
import OrderList from './orderList.js';
import { FlatList } from 'react-native';
import { BottomTabUser } from './components/bottomTabUser.js';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const OrderBox = ({ order, currentTimestamp }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);

  const calculateTotalCost = () => {
    // Calculate total cost by summing up the prices of individual items multiplied by their counts
    return order.items.reduce((total, item) => total + item.coinCount * item.count, 0);
  };

  useEffect(() => {
    // Calculate remaining time for pending orders
    if (order.status === 'pending') {
      const orderTimestamp = new Date(order.orderDate).getTime();
      const elapsedSeconds = Math.floor((currentTimestamp - orderTimestamp) / 1000);
      const remainingSeconds = Math.max(0, 900 - elapsedSeconds); // 15 minutes in seconds
      setRemainingTime(remainingSeconds);
    }
  }, [order, currentTimestamp]);


  return (
    <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
      <View style={{ borderWidth: 0.8, borderRadius: 10, borderColor: 'black', padding: 10, width: '90%', marginBottom: 5, left: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`Order ID: ${order.orderId}`}</Text>
        <Text >{`Order Date: ${order.orderDate}`}</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{`Status: ${order.status}`}</Text>
        {showDetails && (
          <>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: '100', fontFamily: 'PressStart2P-Regular', textAlign: 'center' }}>
                {'-'.repeat(60)}
              </Text>
            </View>
            {order.items.map((item, index) => (


              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '85%' }}>
                  <Text key={index} style={{ fontSize: 18, fontFamily: 'press-start-2p', fontWeight: 'bold' }}>
                    {`${item.dishName} x ${item.count}`}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('./jiitcafeassests/jcoins.png')}
                    style={{ width: 25, height: 25, }}
                  />
                  <Text key={index} style={{ fontWeight: 'bold', fontSize: 18, fontFamily: 'press-start-2p', position: 'relative', left: 4.5, top: 0.3 }}>
                    {`${(item.coinCount * item.count)}`}
                  </Text>

                </View>

              </View>
            ))}
            <View style={{ marginTop: 20, flexDirection: 'row' }}>

              <View style={{ width: '73%' }}>
                <Text style={{ fontSize: 22, fontFamily: 'press-start-2p', fontWeight: 'bold' }}>
                  Total Cost
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }} >
                <Image
                  source={require('./jiitcafeassests/jcoins.png')}
                  style={{ width: 30, height: 30, position: 'relative', top: 0 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 22, fontFamily: 'press-start-2p', position: 'relative', left: 4.5, top: 0.3 }}>
                  {`${calculateTotalCost()}`}
                </Text>

              </View>
            </View>
            {order.status === 'pending' && (
              <View style={{ backgroundColor: '#BEB6B6', borderWidth: 1, borderRadius: 10, padding: 8, alignItems: 'center', width: '50%', left: 90, flexDirection: 'column', top: 10, marginBottom: 5 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Remaining Time</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{`${formatTime(remainingTime)}`}</Text>

              </View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const MaintokenPage = ({ onClose }) => {
  const [showOrderId, setShowOrderId] = useState(false);
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [latestOrderTimestamp, setLatestOrderTimestamp] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const [pendingOrders, setPendingOrders] = useState([]);
  const { userData } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (timer === 0) {
      fetchOrders();
      // Reset the timer for the next interval (15 minutes)
      setTimer(900);
    }
  }, [timer]);

  const fetchOrders = async () => {
    try {
      const { token } = userData;

      // Fetch all user orders
      const response = await fetch('http://192.168.1.11:3000/auth/alluserorders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('API Response:', response);

      if (response.ok) {
        const allOrders = await response.json();

        // Tag orders with status
        const ordersWithStatus = allOrders.map(order => {
          const status = determineStatus(order); // Implement determineStatus function
          return { ...order, status };
        });

        setOrders(ordersWithStatus);
      } else {
        // Handle error
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      // Handle network error
      console.error('Error fetching orders:', error);
    }
  };

  const determineStatus = (order) => {
    // Check if the order exists and has a status property
    if (order && order.status) {
      return order.status.toLowerCase(); // Assuming the status is a string like 'Pending', 'Failed', 'Successful'
    }

    return 'unknown'; // Set a default status if needed
  };



  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const handleOrderIdToggle = () => {
    setShowOrderId(!showOrderId);
  };

  const { selectedItems } = useSelectedItems();

  // Calculate total cost
  const totalCost = selectedItems.reduce((acc, item) => acc + item.amount * item.cost, 0);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardShouldPersistTaps="always"
      keyboardVerticalOffset={-500}
    >
      <Image
        source={require('./jiitcafeassests/cafelogo.png')}
        style={{ width: 60, height: 60, position: 'absolute', top: -70, left: 10 }} // Adjust the dimensions as needed
      />

      <Text style={{ fontSize: 19, fontWeight: 'bold', position: 'absolute', textAlign: 'left', left: 74, top: -50, color: 'black' }}>
        JIIT CAFE</Text>
      <FlatList
        style={{ height: '100%', alignContent: 'center', }}
        data={orders}
        renderItem={({ item }) => <OrderBox order={item} currentTimestamp={new Date().getTime()} />}
        keyExtractor={(item) => item.orderId.toString()}
      />
      <BottomTabUser focussedIndex={1} />


    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MaintokenPage;
