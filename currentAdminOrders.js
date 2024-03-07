import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect,useContext } from 'react';
import { ImageBackground, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex } from 'react-native';
import { NativeBaseProvider, Box, Center } from "native-base";
import { FlatList } from 'react-native';
import { BottomTabAdmin } from './components/bottomTabAdmin.js';
import { Tokentop } from './components/tokenCat.js';
import { Card } from 'react-native-elements';
import { OrdersContext } from './stockContext.js'; 

export default function OrderAdmin () {
  
  const [pendingOrders, setPendingOrders] = useState([]);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleCompleteOrder = async (orderId, orderedBy) => {
    try {
      const response = await fetch('http://192.168.177.64:3000/adminAuth/completeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ orderId, orderedBy }),
      });

      console.log('API Response:', response);

      if (response.ok) {
        console.log('Order completed successfully');
        setOrderCompleted(true);
      } else {
        console.error('Error completing order:', response.statusText);
      }
    } catch (error) {
      console.error('Error completing order:', error.message);
    }
  };

//                  <Image style = {{height: 33, width: 33,position:'relative',top:5,left:40}} source={require('./jiitcafeassests/adminsuccess.gif')}/>


  useEffect(() => {
    fetch('http://192.168.177.64:3000/adminAuth/fetchPendingOrders')
      .then((response) => response.json())
      .then((data) => setPendingOrders(data))
      .catch((error) => console.error('Error fetching pending orders:', error));

      setOrderCompleted(false);
  }, [orderCompleted]);
  
  
      
      return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='height'
        keyboardShouldPersistTaps='always' 
        keyboardVerticalOffset={-500}
        >
        <ImageBackground source={require('./jiitcafeassests/mainbg.png')} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container} keyboardShouldPersistTaps='always'>

        <Image
            source={require('./jiitcafeassests/cafelogo.png')} 
            style={{ width: 60, height: 60, position:'absolute', top: 35, left: 10 }} // Adjust the dimensions as needed
        />
        
          <Text style={{fontSize: 19, fontWeight: 'bold', position:'absolute', textAlign: 'left', left:74 ,top:55, color: 'black'}}>
            JIIT CAFE</Text>
           
            <StatusBar style="auto" />

        <Tokentop focussedIndex={0}  />

      </SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: 'white', marginTop: 160, marginBottom: 60 }}>
      <View style={{ alignItems: 'center', marginBottom: 60 }}>
        {pendingOrders.length > 0 ? (
          pendingOrders.map((order) => (
            <Card key={order.orderId} containerStyle={{ width: '100%', marginBottom: -17, backgroundColor: 'white', paddingBottom: 40 }}>
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
                  


                <TouchableOpacity style={{ borderColor: 'black', borderWidth: 0.5, width: 120, height: 70, backgroundColor: 'white', position: 'absolute', top: 35, left: 200,borderRadius: 10,elevation:5 }} onPress={() => handleCompleteOrder(order.orderId, order.orderedBy[0].enrollmentNo)}>
                  <Text style={{ textAlign: 'center', color: 'black', top:15,fontSize:12 }}>Press to Complete Order</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        ) : (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Image
              source={require('./jiitcafeassests/a-noorders.png')}
              style={{ width: 350, height: 350 }}
            />
            <Text>No pending orders</Text>
          </View>
        )}
      </View>
    </ScrollView>
  
    <NativeBaseProvider>
   <BottomTabAdmin focussedIndex={1} />
    </NativeBaseProvider>
    </ImageBackground>
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