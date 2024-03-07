import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex } from 'react-native';
import { NativeBaseProvider, Box, Center } from "native-base";
import { BottomTabAdmin } from './components/bottomTabAdmin.js';
import { Tokentop } from './components/tokenCat.js';
import { Card } from 'react-native-elements';

export default function Orders2() {

  const [successfulOrders, setSuccessfulOrders] = useState([]);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const fetchSuccessfulOrders = async () => {
    try {
      const response = await fetch('http://192.168.177.64:3000/adminAuth/successfulOrdersFetch', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
        });

      const data = await response.json();

      if (response.ok) {
        console.log('orders successfully retrieved');
        setSuccessfulOrders(data);
      } else {
        console.error('Error completing order:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching successful orders:', error);
    }
  };


  useEffect(() => {
    setOrderCompleted(true);
    fetchSuccessfulOrders();
    setOrderCompleted(false);
  }, [orderCompleted]);

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior='height'
    keyboardShouldPersistTaps='always' 
    keyboardVerticalOffset={-500}
    >
    
    <SafeAreaView style={styles.container} keyboardShouldPersistTaps='always'>

    <Image
        source={require('./jiitcafeassests/cafelogo.png')} 
        style={{ width: 60, height: 60, position:'absolute', top: 35, left: 10 }}
    />
    
      <Text style={{fontSize: 19, fontWeight: 'bold', position:'absolute', textAlign: 'left', left:74 ,top:55, color: 'black'}}>
        JIIT CAFE</Text>
       
        <StatusBar style="auto" />

    <Tokentop focussedIndex={1}  />


  </SafeAreaView>
  <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#ffffff', marginTop: 160, marginBottom: 60 }}>
  <View style={{ alignItems: 'center', marginBottom: 60 }}>
    {successfulOrders.length > 0 ? (
      successfulOrders.map((order) => (
        <Card key={order.orderId} containerStyle={{ width: '100%', marginBottom: -17, backgroundColor: '#AAAAAA', paddingBottom: 25 }}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 500, fontSize: 18 }}>{`Order ID: ${order.orderId}`}</Text>
              <Text style={{ fontWeight: 500, fontSize: 18, position: 'absolute', left: 220 }}>{`${order.orderedBy[0].name}`}</Text>
            </View>
            <View style={{
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              width: 800,
              textAlign: 'center',
              paddingVertical: 10,
              position: 'absolute',
              top: 8,
              right: -17
            }} >
            </View>

            {order.items.map((item, index) => (
              <Text style={{ fontWeight: 500, fontSize: 18, top: 12 }} key={index}>{`${item.dishName} x ${item.count}`}</Text>
            ))}

              <Text style={{ fontWeight: 500, fontSize: 16, top: 15 }}>{`Date: ${new Date(order.orderDate).toLocaleDateString()}`}</Text>
              
          </View>
        </Card>
      ))
    ) : (
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Image
          source={require('./jiitcafeassests/a-noorders.png')}
          style={{ width: 350, height: 350 }}
        />
        <Text>No completed orders</Text>
      </View>
    )}
  </View>
</ScrollView>

<NativeBaseProvider>
<BottomTabAdmin focussedIndex={1} />
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



  roundedBox: {
    position: 'absolute', 
    bottom: 230,
    width: 350, 
    height: 300, 
    backgroundColor: 'aqua', // Background color of the box
    borderRadius: 30, 
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
},

fields: {
  position: 'absolute',
  bottom: 380,
  right: 30,
  width: 250, 
  height: 40, 
  backgroundColor: 'black', // Background color of the box
  borderRadius: 30, 
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
container2: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
card: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  padding: 16,
  marginVertical: 8,
  width: '90%',
  borderRadius: 10,
},
orderDetails: {
  flex: 1,
},
checkbox: {
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 5,
  padding: 8,
},
noOrdersContainer: {
  alignItems: 'center',
  justifyContent: 'center',
},

});