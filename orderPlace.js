//food.js
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Cards } from './components/cards.js';
import { NativeBaseProvider, Box, Center } from "native-base";
import { FlatList } from 'react-native';
import { BottomTabAdmin } from './components/bottomTabAdmin.js';
import { reduce } from 'lodash';
import { useSelectedItems } from './SelectedItemsContext.js';
import AdminCartButton from './components/adminCartButton.js';

export default function OrderPlace() {
  const navigation = useNavigation();

  const { selectedItems, setSelectedItems, cardData, addOrUpdateItemInCart } = useSelectedItems();
  const [prevCost, setNewTotalCost] = useState(0);
  const [selectedItemCounts, setSelectedItemCounts] = useState({});
  const totalCount = reduce(selectedItems, (sum, item) => sum + item.count, 0);
  const flatListRef = useRef(); // Reference to the FlatList component
  const [searchText, setSearchText] = useState(''); // State to store the search text


  const [name, setName] = useState('');

  const handleNameChange = (text) => {
    if (text === '') {
      alert('Please enter the name first');
      return
    }
    setName(text);
  }

  const handleCardPress = (itemId) => {
    addOrUpdateItemInCart(itemId);
  };

  const [isAccountBoxVisible, setIsAccountBoxVisible] = useState(false);

  const toggleAccountBox = () => {
    setIsAccountBoxVisible(!isAccountBoxVisible);
  };

  const handleCountChange = (itemId, newCount, prevCount) => {

    const selectedItemIndex = selectedItems.findIndex((item) => item.id === itemId);

    const selectedItem = cardData.find((item) => item.id === itemId);

    const coinChange = (newCount - prevCount) * selectedItem.coinCount;

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
      return text.substring(0, maxLength);
    }
    return text;
  }

  const [item, searchItem] = useState('');

  const search = (newText) => {
    newText = truncateText(newText, 10);
    searchItem(newText);
  };


  const renderCard = ({ item }) => (
    <Cards imageUrl={item.imageUrl} id={item.id} dishName={item.dishName} price={item.price} coinCount={item.coinCount} onCountChange={(id, newCount, prevCount) => handleCountChange(item.id, newCount, prevCount)} count={item.count} />
  );

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
            style={{ width: 60, height: 60, position: 'absolute', top: 35, left: 10 }} // Adjust the dimensions as needed
          />

          <Text style={{ fontSize: 19, fontWeight: 'bold', position: 'absolute', textAlign: 'left', left: 74, top: 55, color: 'black' }}>
            JIIT CAFE</Text>

          <View style={[styles.fields, { bottom: 260, right: 22, width: 350, height: 50 }]} overflow='hidden' >

            <TextInput style={{ color: 'black', right: 40, }}
              fontSize={19}
              placeholder='Search for food items'
              placeholderTextColor='black'
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
              blurOnSubmit={true}
              onSubmitEditing={searchFood}
            />

          </View>

          <View
            style={{ opacity: 100, position: 'Absolute', top: -220, right: -200 }}>
            <AdminCartButton />
          </View>

          <StatusBar style="auto" />

        </SafeAreaView>

        <NativeBaseProvider>
          <Center right={'0'}>
            <FlatList
              contentContainerStyle={{ paddingBottom: 30 }}
              showsVerticalScrollIndicator={false}
              ref={flatListRef} 
              style={{ height: '160%' }}
              bottom={224}
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
          <BottomTabAdmin focussedIndex={2} />
        </NativeBaseProvider>


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
              style={{ width: 33, height: 33, }} // Adjust the dimensions as needed
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('adminCart', { name, prevCost });
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
    backgroundColor: 'transparent', // Background color of the box
    borderWidth: 1, // Adjust the borderWidth to control the thickness
    //textAlign: 'center',
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
    bottom: 53.5,
    left: 0,
    right: 0,
    backgroundColor: '#FBA834',
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
  fields2: {
    flex: 1,
    position: 'absolute', // Change the position to absolute
    bottom: 380,
    right: 30,
    width: 240, // Adjust the width as needed
    height: 53, // Adjust the height as needed
    alignItems: 'center',
    backgroundColor: 'transparent', // Background color of the box
    borderWidth: 1,
    borderRadius: 10, // Adjust the borderRadius to control the roundness
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },

});