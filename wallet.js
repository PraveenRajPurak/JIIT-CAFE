import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, ImageBackground, ScrollView, Button, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Flex } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Cards } from './components/cards.js';
import { NativeBaseProvider, Box, Center } from "native-base";
import { FlatList } from 'react-native';
import { BottomTabUser } from './components/bottomTabUser.js';
import { fetchUserDetails } from './fetchApi.js';
import { useUser } from './userContext.js';

export default function Wallet() {

  const { userData } = useUser() || {};
  const { token } = useUser() || {};

  const navigation = useNavigation();
  // State to store user details
  const [userDetails, setUserDetails] = useState(null);

  // Fetch user details when the component mounts
  const fetchUserData = async () => {
    const userDetailsData = await fetchUserDetails(userData);
    console.log('User Details:', userDetailsData);
    setUserDetails(userDetailsData);
  };

  useEffect(() => {
    if (userData) {
      fetchUserData();
    }
  }, [userData]);

  const [isAccountBoxVisible, setIsAccountBoxVisible] = useState(false);

  // Function to toggle the visibility of the account box
  const toggleAccountBox = () => {
    setIsAccountBoxVisible(!isAccountBoxVisible);
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

          <View style={[styles.fields, { bottom: 328, right: 85, width: 100, height: 40, backgroundColor: 'transparent', borderColor: 'black', borderWidth: 1, flexDirection: 'row' }]} overflow='hidden' >
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

          <TouchableOpacity onPress={toggleAccountBox} style={{ zIndex: 0 }}>
            <Image
              source={require('./jiitcafeassests/account.png')}
              style={{ width: 38.4, height: 38.4, position: 'absolute', top: -124, right: -174 }} // Adjust the dimensions as needed
            />
          </TouchableOpacity>

          <View style={[styles.fields, { bottom: 160, right: 70, width: 250, height: 100, backgroundColor: '#FFA732', borderColor: 'black', borderWidth: 0, flexDirection: 'row', alignItems: 'center', elevation: 8 }]} overflow='hidden' >
            <Image
              source={require('./jiitcafeassests/jcoins.png')}
              style={{ width: 40, height: 40, }} // Adjust the dimensions as needed
            />
            {userDetails ? (
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{userDetails.jCoins}</Text>
            ) : (
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}> 0</Text>
            )}
          </View>

          <Image
            source={require('./jiitcafeassests/noordersreal.png')}
            style={{ width: 250, height: 250, position: 'absolute', top: 280, right: 49, opacity: 0.42 }} // Adjust the dimensions as needed
          />

          <Text style={{ fontSize: 20, fontWeight: 'bold', top: 375 }}>No Receipts</Text>
          <Text style={{ fontSize: 15, fontWeight: '300', padding: 10, textAlign: 'center', top: 378 }}>Your transaction receipts will appear here</Text>


          <StatusBar style="auto" />

        </SafeAreaView>
       
        <NativeBaseProvider>
          <BottomTabUser focussedIndex={2} />
        </NativeBaseProvider>

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
    borderRadius: 18, // Adjust the borderRadius to control the roundness
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
