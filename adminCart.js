//cart.js
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Cards} from './components/cards.js';
import { Dimensions } from 'react-native';
import { NativeBaseProvider, Box, Center } from "native-base";
import { FlatList } from 'react-native';
import { BottomTabAdmin } from './components/bottomTabAdmin.js';
import { useSelectedItems } from './SelectedItemsContext.js';
import { SwipeRow } from 'native-base';
import SwipeValueBasedUi from './components/swipeList.js';

export default function Admincart () {
    // Get the screen width
    const screenWidth = Dimensions.get('window').width;
    const screenLength = Dimensions.get('window').height;

    const { selectedItems, removeItemFromCart, cardData } = useSelectedItems();
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
 

           {
             selectedItems.length === 0 ? (
               <View>
                 <Center>
                   <Image
                     source={require('./jiitcafeassests/nofood.png')}
                     style={{ width: 300, height: 200, position: 'absolute', top: 150, right: 10 }}
                   />
                   <Text style={{ fontSize: 20, fontWeight: '600', top: 380 }}> No items Found </Text>
                   <Text style={{ fontSize: 16, fontWeight: '300', padding: 10, textAlign: 'center', top: 380 }}>
                     Add items in your cart from the menu
                   </Text>
                 </Center>
               </View>
             ) : (
              <View style={{ top: 150, height: screenLength - 40, }}>
              {/* Content for when selectedItems.length is not 0 */}
              {selectedItems.length > 0 && (
                <SwipeValueBasedUi /> // Render the SwipeValueBasedUi once
              )}
              </View>
                )
           }
          
          <StatusBar style="auto" />
  
         </SafeAreaView>
  
         <NativeBaseProvider>
            <BottomTabAdmin focussedIndex={2} />
         </NativeBaseProvider>
  
      </KeyboardAvoidingView>    
      
    );
}

const styles = StyleSheet.create({

    container: {
      flexGrow: 1,
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

    cartItem: {
      
      flexDirection: 'row', // Items will be displayed in a row
      alignItems: 'center', // Center items vertically
      justifyContent: 'flex-start', // Distribute items evenly
      marginVertical: 5, // Adjust the vertical margin as needed
      padding: 10, // Add padding for spacing and visual appeal
      backgroundColor: 'white', // Background color of the cart item
      borderRadius: 10, // Add border radius for rounded corners
    },


    image: {
      width: 50, // Adjust the image width as needed
      height: 50, // Adjust the image height as needed
      marginRight: 10, // Spacing between the image and text
      borderRadius: 5, // Add border radius to the image
    },


    text: {
      fontSize: 16, // Adjust the text font size as needed
      fontWeight: 'bold', // Text style
    },
  
  
  });