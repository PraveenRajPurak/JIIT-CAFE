import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect,useContext } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex } from 'react-native';
import { NativeBaseProvider, Box, Center } from "native-base";
import { FlatList } from 'react-native';
import { BottomTabAdmin } from './components/bottomTabAdmin.js';
import { Tokentop } from './components/tokenCat.js';
import { Card } from 'react-native-elements';
import { OrdersContext } from './stockContext.js'; 

export default function OrderAdmin () {
  
  const { currentOrders, completeOrder } = useContext(OrdersContext); 

 /* const [currentOrders, setCurrentOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [unusedOrders, setUnusedOrders] = useState([]);

  useEffect(() => {
    setCurrentOrders([
      { 
        Order_Id: 1, 
        Name_of_customer: 'SahilSher Singh', 
        items: [
          { name: 'Coffee', quantity: 2 },
          { name: 'Cake', quantity: 1 }
        ] 
      },
      { 
        Order_Id: 2, 
        Name_of_customer: 'SahilSher khanna', 
        items: [
          { name: 'Coffee', quantity: 2 },
          { name: 'Cake', quantity: 1 }
        ] 
      },
      { 
        Order_Id: 3, 
        Name_of_customer: 'SahilSher Yadav', 
        items: [
          { name: 'Coffee', quantity: 2 },
          { name: 'Cake', quantity: 1 }
        ] 
      },
      { 
        Order_Id: 4, 
        Name_of_customer: 'SahilSher Aggarwal', 
        items: [
          { name: 'Coffee', quantity: 2 },
          { name: 'Cake', quantity: 1 }
        ] 
      },
      { 
        Order_Id: 5, 
        Name_of_customer: 'SahilSher Pandey', 
        items: [
          { name: 'Coffee', quantity: 2 },
          { name: 'Cake', quantity: 1 }
        ] 
      },
      { 
        Order_Id: 6, 
        Name_of_customer: 'SahilSher Garg', 
        items: [
          { name: 'Coffee', quantity: 2 },
          { name: 'Cake', quantity: 1 }
        ] 
      },
      { 
        Order_Id: 7, 
        Name_of_customer: 'SahilSher Rhodes', 
        items: [
          { name: 'Coffee', quantity: 2 },
          { name: 'Cake', quantity: 1 }
        ] 
      },
      { 
        Order_Id: 8, 
        Name_of_customer: 'SahilSher Kumar', 
        items: [
          { name: 'Coffee', quantity: 2 },
          { name: 'Cake', quantity: 1 }
        ] 
      },
      { 
        Order_Id: 9, 
        Name_of_customer: 'SahilSher Singh', 
        items: [
          { name: 'Coffee', quantity: 2 },
          { name: 'Cake', quantity: 1 }
        ] 
      },


    ]);
  }, []);

  const completeOrder = (order) => {
    setCompletedOrders((prevCompletedOrders) => [
      ...prevCompletedOrders,
      order
    ]);
    setCurrentOrders((prevCurrentOrders) =>
      prevCurrentOrders.filter((o) => o.Order_Id !== order.Order_Id)
    );
    console.log('Order completed:', order);
    console.log('Completed Orders:', completedOrders);
  
    // Navigate to 'orders2' with updated 'completedOrders'
    navigation.navigate('orders2', { completedOrders: [...completedOrders, order] });
  };
  
  
  

  useEffect(() => {
    const timer = setInterval(() => {
      // Check if any orders exceed the 15-minute limit
      const expiredOrders = currentOrders.filter((order) => {
        // Replace this with your actual time comparison logic
        // For demonstration, assuming 15 minutes as 900,000 milliseconds
        const fifteenMinutesAgo = new Date().getTime() - 900000;
        return order.timeStamp < fifteenMinutesAgo;
      });

      // Move expired orders to unused orders list
      if (expiredOrders.length > 0) {
        setUnusedOrders([...unusedOrders, ...expiredOrders]);
        const updatedOrders = currentOrders.filter(
          (order) => !expiredOrders.some((expired) => expired.Order_Id === order.Order_Id)
        );
        setCurrentOrders(updatedOrders);
      }
    }, 1000); // Check every second (you might want to adjust this)
    
    return () => clearInterval(timer); // Clean up timer
  }, [currentOrders, unusedOrders]);
*/
      
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
            style={{ width: 60, height: 60, position:'absolute', top: 35, left: 10 }} // Adjust the dimensions as needed
        />
        
          <Text style={{fontSize: 19, fontWeight: 'bold', position:'absolute', textAlign: 'left', left:74 ,top:55, color: 'black'}}>
            JIIT CAFE</Text>
           
            <StatusBar style="auto" />

        <Tokentop focussedIndex={0}  />


      </SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#ffffff', marginTop: 160, marginBottom: 60 }}>
      <View style={{ alignItems: 'center',marginBottom: 60 }}>
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => (
            <Card key={order.Order_Id} containerStyle={{ width: '100%',marginBottom: -17, backgroundColor: '#AAAAAA',paddingBottom: 18 }}>
              <View>
                <View style = {{flexDirection: 'row'}}> 
                <Text style = {{fontWeight: 500,fontSize: 18 }}>{`Order ID: ${order.Order_Id}`}</Text>
                <Text style = {{fontWeight: 500,fontSize: 18,position: 'absolute', left: 220 }}>{`${order.Name_of_customer}`}</Text>
                </View>
                <View style = {
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    width: 800, 
                    textAlign: 'center',
                    paddingVertical: 10,
                    position: 'absolute',
                    top: 8,
                    right: -17
                  }
                } > 
                </View>
               
                {order.items.map((item, index) => (
                <Text style = {{fontWeight: 500,fontSize: 18,top: 12 }} key={index}>{`${item.name} x ${item.quantity}`}</Text>
                 ))}
                <TouchableOpacity style = {{borderColor: 'black',borderWidth: 1,width: 45,height: 45, backgroundColor: '#0000FF',position: 'absolute',top: 35,left: 270}} onPress={() => completeOrder(order)}>
                  
                </TouchableOpacity>
              </View>
            </Card>
          ))
        ) : (
          // Display image if no current orders
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Image
              source={require('./jiitcafeassests/a-noorders.png')}
              style={{ width: 350, height: 350 }} // Adjust dimensions as needed
            />
            <Text>No orders till now</Text>
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