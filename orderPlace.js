//food.js
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Cards} from './components/cards.js';
import { NativeBaseProvider, Box, Center } from "native-base";
import { FlatList } from 'react-native';
import { BottomTabAdmin } from './components/bottomTabAdmin.js';
import { reduce } from 'lodash';
import { useSelectedItems } from './SelectedItemsContext.js';
import AdminCartButton from './components/adminCartButton.js';

export default function OrderPlace () {
  const navigation = useNavigation();

  const { selectedItems, setSelectedItems, cardData, addOrUpdateItemInCart } = useSelectedItems();
  const [prevCost, setNewTotalCost] = useState(0);
  const [selectedItemCounts, setSelectedItemCounts] = useState({});
  const totalCount = reduce(selectedItems, (sum, item) => sum + item.count, 0);
  const flatListRef = useRef(); // Reference to the FlatList component
  const [searchText, setSearchText] = useState(''); // State to store the search text
 

  // Handle card press to add items to the cart
  const handleCardPress = (itemId) => {
    addOrUpdateItemInCart(itemId);
  };

  // State to control the visibility of the account box
  const [isAccountBoxVisible, setIsAccountBoxVisible] = useState(false);

  // Function to toggle the visibility of the account box
  const toggleAccountBox = () => {
    setIsAccountBoxVisible(!isAccountBoxVisible);
  };

  const handleCountChange = (itemId, newCount, prevCount) => {

    // Find the item in the selectedItems array
    const selectedItemIndex = selectedItems.findIndex((item) => item.id === itemId);
  
    // Find the item in the cardData array
    const selectedItem = cardData.find((item) => item.id === itemId);
  
    // Calculate the change in Jcoin count based on the newCount and prevCount
    const coinChange = (newCount - prevCount) * selectedItem.coinCount;

    // Update the item information with the count
    const updatedItem = { ...selectedItem, count: newCount };
  
    // Update the Jcoin count
    setNewTotalCost((prevCost) => prevCost + coinChange);
  
    // Update the item counters based on the change
    const updatedCounts = { ...selectedItemCounts };
  
    if (newCount > 0) {
      // Increment the count for this item
      updatedCounts[itemId] = newCount;
    } else {
      // Remove the item from the counts when its count reaches 0
      delete updatedCounts[itemId];
    }
  
    setSelectedItemCounts(updatedCounts);
  
    const updatedItems = Object.keys(updatedCounts).map((id) => {
      const count = updatedCounts[id];
      const item = cardData.find((item) => item.id === id);
      return { ...item, count };
    });
  
    setSelectedItems(updatedItems);
  
    // Update the cardData array if needed
    cardData.forEach((item) => {
      const count = updatedCounts[item.id] || 0;
      item.count = count;
    });

    if (newCount > prevCount) {
      const index = cardData.findIndex((item) => item.id === itemId);
      if (index >= 0 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index });
      }
    }
    
  };

  const searchFood = () => {
    // Search for the card with the matching dish name
    const matchingItem = cardData.find((item) => item.dishName.toLowerCase() === searchText.toLowerCase());
    console.log('Matching Item:', matchingItem); // Add this line
    if (matchingItem) {
      // Scroll to the matching card if found
      const index = cardData.findIndex((item) => item.id === matchingItem.id);
      console.log('Index:', index); // Add this line
      if (index >= 0 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index });
      }
    }
  };
  
  
  
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
       return text.substring(0, maxLength) ;
     }
     return text;
  }

  const [item, searchItem] = useState('');

  const search = (newText) => {
    newText = truncateText(newText, 10);
    searchItem(newText);
  };

  


  /*const cardData = [
    { id: '1', imageUrl: require('./jiitcafeassests/Indian-samosa-chutney.webp'), dishName: 'Samosa', coinCount: 10 },
    { id: '2', imageUrl: require('./jiitcafeassests/pasta.png'), dishName: 'Pasta', coinCount: 20 },
    { id: '3', imageUrl: require('./jiitcafeassests/patties.png'), dishName: 'Patty', coinCount: 10 },
    { id: '4', imageUrl: require('./jiitcafeassests/noodles.png'), dishName: 'Noodles', coinCount: 20 },
    { id: '5', imageUrl: require('./jiitcafeassests/burger.png'), dishName: 'Burger', coinCount: 30 },
    { id: '6', imageUrl: require('./jiitcafeassests/hotdog.png'), dishName: 'Hotdog', coinCount: 20 },
    { id: '7', imageUrl: require('./jiitcafeassests/coffee.png'), dishName: 'Coffee', coinCount: 10 },
    // Add more card data as needed
  ];*/

  const renderCard = ({ item }) => (
    <Cards imageUrl={item.imageUrl} id={item.id} dishName={item.dishName} price={item.price} coinCount={item.coinCount}  onCountChange={(id,newCount,prevCount) => handleCountChange(item.id, newCount,prevCount)} count={item.count}  />
  );

    
    return (
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always' // This should handle taps outside TextInput
      keyboardVerticalOffset={-500}
      >
      
      <SafeAreaView style={styles.container} keyboardShouldPersistTaps='always'>
      <SafeAreaView style={styles.curvedLine}/>
      <Image
          source={require('./imgs/jcafelogo1-removebg-preview.png')} 
          style={{ width: 60, height: 60, position:'absolute', top: 60, left: 30 }} // Adjust the dimensions as needed
      />
      
        <Text style={{fontSize: 19, fontWeight: 'bold', position:'absolute', textAlign: 'left', left:100 ,top:75, color: 'black'}}>
          JIIT CAFE</Text>

          <View style={[styles.fields, {bottom:311, right:85, width: 100, height: 50, backgroundColor: 'white', borderColor:'black', borderWidth: 1, flexDirection: 'row'}]} overflow = 'hidden' >
          <Image
          source={require('./jiitcafeassests/jcoins.png')} 
          style={{ width: 33, height: 33,  }} // Adjust the dimensions as needed
          />
          <Text style={{fontSize:20, }} >100</Text>
          </View>

          <View style={[styles.fields, {bottom:199, right:32, width:350}]} overflow = 'hidden' >

          <TextInput style={{color: 'white', right: 40, }}
                         fontSize={19}
                         placeholder='Search for food items'
                         placeholderTextColor= 'white'
                         onChangeText={(text) => setSearchText(text)} // Update the search text state
                         value={searchText}
                         blurOnSubmit={true}
                         onSubmitEditing={searchFood}
                          />

          </View>

          <TouchableOpacity onPress={toggleAccountBox} style={{ zIndex: 0 }}>
          <Image
          source={require('./jiitcafeassests/account.png')} 
          style={{ width: 45, height: 45, position:'absolute', top: -150, right: -177 }} // Adjust the dimensions as needed
          />
          </TouchableOpacity>

          <StatusBar style="auto" />

       </SafeAreaView>
       

       <NativeBaseProvider>
          <Center right={'6'}>
          <FlatList
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
          ref={flatListRef} // Associate flatListRef with FlatList
          style={{ height: '160%' }}
          bottom={178}
          data={cardData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          initialNumToRender={10}
          getItemLayout={(data, index) => ({
            length: 400, // Replace with the actual height of your items
            offset: 400 * index,
            index,
          })}
        />
          </Center>
          <BottomTabAdmin focussedIndex={3} />
       </NativeBaseProvider>

      
    {/* Conditional rendering of the box */}
      {selectedItems.length > 0 && (
          <View style={styles.orderSummaryBox}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              Items: {totalCount}
          </Text>
         <View style={styles.verticalSeparator} />
         <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
              Jcoins: {prevCost + ' '}
         </Text>
         <Image
              source={require('./jiitcafeassests/jcoins.png')} 
              style={{ width: 33, height: 33,  }} // Adjust the dimensions as needed
         />
        <TouchableOpacity
              onPress={() => {
              navigation.navigate('admincart');
               }}
              style={styles.button}
        >
        <Text style={styles.buttonText}>View Cart ➭</Text>
        </TouchableOpacity>
        </View>
      )}

                {/* Account box */}
                {isAccountBoxVisible && (
                <View style={styles.accountBox}>
                  <Button onPress={() => {
                     navigation.navigate('login');
                   }} title='logout' color={'black'}
                   >
                  </Button>
                </View>
                )}


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
        bottom: 150,
        width: 350, // Adjust the width as needed
        height: 480, // Adjust the height as needed
        backgroundColor: 'lightblue', // Background color of the box
        borderRadius: 30, // Adjust the borderRadius to control the roundness
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
  
    fields: {
      position: 'absolute', // Change the position to absolute
      bottom: 380,
      right: 30,
      width: 340, // Adjust the width as needed
      height: 60, // Adjust the height as needed
      alignItems: 'center',
      backgroundColor: 'black', // Background color of the box
      borderRadius: 28, // Adjust the borderRadius to control the roundness
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

    orderSummaryBox: {
      position: 'absolute',
      bottom: 48.5,
      left: 0,
      right: 0,
      backgroundColor: 'orange',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      padding: 10,
      borderRadius: 15,
      marginLeft: 10,
      marginRight: 14,
    },

    verticalSeparator: {
      width: 1,
      height: '140%', // Adjust the height of the separator
      backgroundColor: 'black',
      marginHorizontal: 15,
    },

    verticalLine: {
      flex: 1,
      width: 1, // Width of the vertical line
      backgroundColor: 'black', // You can set the color of the separator
    },

    button: {
      backgroundColor: 'white',
      borderRadius: 10, // Adjust the border radius for rounded corners
      padding: 5, // Adjust padding as needed
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 50,
    },

    buttonText: {
      color: 'orange',
      fontSize: 14, // Adjust font size as needed
      fontWeight: 'bold', // Adjust font weight as needed
    },

    accountBox: {
      position: 'absolute',
      top: 108, // Adjust the top position as needed
      width: 130,
      right: 25,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 5,
      elevation: 5, // Add elevation for shadow effect
    },
  
  
  });