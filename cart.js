//cart.js
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Cards } from './components/cards.js';
import { Dimensions } from 'react-native';
import { NativeBaseProvider, Box, Center } from "native-base";
import { FlatList } from 'react-native';
import { BottomTabUser } from './components/bottomTabUser.js';
import { useSelectedItems } from './SelectedItemsContext.js';
import { SwipeRow } from 'native-base';
import SwipeValueBasedUi from './components/swipeList.js';
import { useUser } from './userContext';
import { fetchUserDetails } from './fetchApi.js';

export default function Cart({ navigation }) {
  const screenWidth = Dimensions.get('window').width;
  const screenLength = Dimensions.get('window').height;

  const { userData } = useUser();

  const { selectedItems, removeItemFromCart, cardData } = useSelectedItems();
  const totalJcoins = selectedItems.reduce((total, item) => {
    return total + (item.count * item.coinCount);
  }, 0);

  // State to store user details
  const [userDetails, setUserDetails] = useState(null);

  // Fetch user details when the component mounts
  const fetchUserData = async (userData) => {
    const userDetailsData = await fetchUserDetails(userData);
    setUserDetails(userDetailsData);
  };

  useEffect(() => {
    fetchUserData(userData);
  }, []);
  const [isAccountBoxVisible, setIsAccountBoxVisible] = useState(false);

  // Function to toggle the visibility of the account box
  const toggleAccountBox = () => {
    setIsAccountBoxVisible(!isAccountBoxVisible);
  };

  const handlePlaceOrder = async () => {
    console.log("Placing Order...");
    console.log(selectedItems);

    const { token } = userData;

    try {
      const response = await fetch('http://192.168.1.11:3000/auth/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          selectedItems,
        }),
      });

      console.log('API Response:', response);
      console.log(userData);

      // After successfully placing the order, navigate to 'ordersUser'
      navigation.navigate('ordersUser', { showTokenPopup: true });
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error (e.g., show a message to the user)
    }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always' // This should handle taps outside TextInput
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


          {
            selectedItems.length === 0 ? (
              <View>
                
                <Center>

                <View style={[styles.fields, { top:-144, right: 35, width: 100, height: 40, backgroundColor: 'transparent', borderColor: 'black', borderWidth: 1, flexDirection: 'row' }]} overflow='hidden' >
                  <Image
                    source={require('./jiitcafeassests/jcoins.png')}
                    style={{ width: 30, height: 30, }} // Adjust the dimensions as needed
                  />
                  {userDetails ? (
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userDetails.jCoins}</Text>
                  ) : (
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}> 0</Text>
                  )}
                </View>
                <TouchableOpacity onPress={toggleAccountBox} style={{ zIndex: 1 }}>
                  <Image
                    source={require('./jiitcafeassests/account.png')}
                    style={{ width: 38.4, height: 38.4, position: 'absolute', top: -143, right: -170 }} // Adjust the dimensions as needed
                  />
                </TouchableOpacity>
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

              <View style={{ alignItems: 'center' }}>
                <View style={[styles.fields, { bottom: 697, right: 85, width: 100, height: 40, backgroundColor: 'transparent', borderColor: 'black', borderWidth: 1, flexDirection: 'row' }]} overflow='hidden' >
                  <Image
                    source={require('./jiitcafeassests/jcoins.png')}
                    style={{ width: 30, height: 30, }} // Adjust the dimensions as needed
                  />
                  {userDetails ? (
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userDetails.jCoins}</Text>
                  ) : (
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}> 0</Text>
                  )}
                </View>
                <TouchableOpacity onPress={toggleAccountBox} style={{ zIndex: 1 }}>
                  <Image
                    source={require('./jiitcafeassests/account.png')}
                    style={{ width: 38.4, height: 38.4, position: 'absolute', top: 34, right: -168 }} // Adjust the dimensions as needed
                  />
                </TouchableOpacity>

                <Text style={{ fontSize: 20, zIndex: 1, position: 'absolute', top: 600, opacity: 0.5, color: 'black' }}>Receipt Details</Text>
                <View style={{ position: 'absolute', top: 630, flexDirection: 'row' }}>

                  <Text style={{ fontSize: 20, zIndex: 1, fontWeight: 'bold' }}>Grand Total : {totalJcoins} <Image
                    source={require('./jiitcafeassests/jcoins.png')}
                    style={{ width: 30, height: 30 }}
                  /></Text>

                </View>

                <View style={{ top: 150, height: screenLength - 40, }}>

                  {selectedItems.length > 0 && (
                    <>

                      <Text style={{ fontSize: 30, zIndex: 1, top: -37, textAlign: 'center', fontWeight: 'bold' }}>My Cart</Text>

                      <SwipeValueBasedUi />

                      <TouchableOpacity

                        style={[styles.roundedBox,
                        { width: 250, height: 60, backgroundColor: '#FBA834', marginTop: 50, alignSelf: 'center', bottom: 170, borderColor: 'transparent' }]}
                        onPress={handlePlaceOrder}
                      >
                        <Text style={{ color: 'white', alignItems: 'center', fontSize: 23, fontWeight: 'bold', }} >Place Order</Text>
                      </TouchableOpacity>

                    </>
                  )}


                </View>
              </View>
            )
          }


          <StatusBar style="auto" />

        </SafeAreaView>

        <NativeBaseProvider>
          <BottomTabUser focussedIndex={3} />
        </NativeBaseProvider>
        {/* Account box */}
        {isAccountBoxVisible && (
          <View style={styles.accountBox}>
            <Button onPress={() => {
              navigation.navigate('LoginCopy');
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
