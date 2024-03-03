import { StatusBar } from 'expo-status-bar';
import React, { useState,useContext } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex } from 'react-native';
import { NativeBaseProvider, Box, Center } from "native-base";
import { BottomTabAdmin } from './components/bottomTabAdmin.js';
import { Tokentop } from './components/tokenCat.js';
import { OrdersContext } from './stockContext.js'; 
import { Card } from 'react-native-elements';
//import { OrdersContext } from './stockContext.js'; 

export default function Orders3() {

  const { unusedOrders } = useContext(OrdersContext); 

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

           <Tokentop focussedIndex={2} />

        </SafeAreaView>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#ffffff', marginTop: 80, marginBottom: 60 }}>
        <View style={{ alignItems: 'center' }}>
          {unusedOrders && unusedOrders.length > 0 ? (
            unusedOrders.map((order) => (
              <Card key={order.Order_Id} containerStyle={{ width: '100%', marginBottom: -10, backgroundColor: '#AAAAAA' }}>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 500, fontSize: 18 }}>{`Order ID: ${order.Order_Id}`}</Text>
                    <Text style={{ fontWeight: 500, fontSize: 18, position: 'absolute', left: 220 }}>{`${order.Name_of_customer}`}</Text>
                  </View>
                  {order.items.map((item, index) => (
                    <Text style={{ fontWeight: 500, fontSize: 18, top: 12 }} key={index}>{`${item.name} x ${item.quantity}`}</Text>
                  ))}
                </View>
              </Card>
            ))
          ) : (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Image
                source={require('./jiitcafeassests/a-noorders.png')}
                style={{ width: 350, height: 350 }}
              />
              <Text>No unused orders yet</Text>
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
  