import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabAdmin } from './components/bottomTabAdmin.js';
import { NativeBaseProvider } from 'native-base';
import RechargePopup from './rechargePopup.js';


export default function RechargeMain() {
  const route = useRoute();
  const userData = route.params?.userData;
  const navigation = useNavigation();

  const [isOrderPlacedPopupVisible, setOrderPlacedPopupVisible] = useState(false);
 

  /*
    function truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength);
      }
      return text;
    }
  
    const navigation = useNavigation();
  
  
    const [storedButton, setStoredButton] = useState(null);
    const [walletValue,setWalletValue] = useState(0);
  
    const handleButtonPress = () => {
  
      const buttonInfo = {
        text: '100',
        imagePath: require('./jiitcafeassests/jcoins.png'),
      };
      setStoredButton(buttonInfo);
    };
  
    const availableCoinsCount = 0;
    // Path to your coins image (replace 'path-to-your-image' with your actual image path)
    
  
    //const [enrollmentNo, getEnrollmentNo] = useState('');
  
    const handleButton = (newText) => {
      newText = truncateText(newText, 10);
      if(newText%100 !== 0){
        alert("Please enter a multiple of 100");
        return;
      }
      //getEnrollmentNo(newText);
    };*/

  const topUpWallet = async () => {
    try {
      const response = await fetch('http://192.168.177.64:3000/adminAuth/rechargeJCoins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enrollmentNo: userData.enrollmentNo,
          amount: parseInt(walletValue), 
        }),
      });

      if (response.ok) {
        // JCoins recharge successful
        const updatedUserData = await response.json();
        console.log('User Details after recharge:', updatedUserData);

        setOrderPlacedPopupVisible(true);

        setTimeout(() => {
          setOrderPlacedPopupVisible(false);
          //{ showTokenPopup: true };
          navigation.navigate('recharge');
        }, 6000);

      } else {
        console.log('Error from server:', response.status);
        // Handle error cases
      }
    } catch (error) {
      console.error('Error recharging JCoins:', error);
      // Handle other errors as needed
    }
  };

  const [walletValue, setWalletValue] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);

  function handleButtonPress(amount) {
    // setWalletValue(amount);
    setWalletValue((prevBalance) => {
      return parseInt(prevBalance) + parseInt(amount);
    });
  };


  const coinsImagePath = require('./jiitcafeassests/jcoins.png');

  const handleRecharge = () => {
    if (walletValue % 100 !== 0) {
      alert('Please enter a multiple of 100');
      return;
    }

    setAvailableBalance((prevBalance) => prevBalance + parseInt(walletValue));

    // Reset walletValue after recharge
    setWalletValue(0);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always'
      keyboardVerticalOffset={-500}
    >
      {isOrderPlacedPopupVisible && (
        <RechargePopup isVisible={isOrderPlacedPopupVisible} onClose={() => setOrderPlacedPopupVisible(false)} />
      )}
      <ImageBackground source={require('./jiitcafeassests/mainbg.png')} style={styles.container} keyboardShouldPersistTaps='always'>
        <Image
          source={require('./jiitcafeassests/cafelogo.png')}
          style={{ width: 60, height: 60, position: 'absolute', top: 35, left: 10 }}
        />

        <Text style={{ fontSize: 19, fontWeight: 'bold', position: 'absolute', textAlign: 'left', left: 74, top: 55, color: 'black' }}>
          JIIT CAFE
        </Text>

        <View style={styles.roundedBox} keyboardShouldPersistTaps='always'>

          <Text style={{ position: 'absolute', top: 45, left: 22, fontSize: 20, fontWeight: 500 }}>{userData.name}</Text>
          <Text style={{ position: 'absolute', top: 78, left: 22, fontSize: 20, fontWeight: 500 }}>{userData.enrollmentNo}</Text>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
              width: '90%',
              top: -50
            }}
          />

          <Text style={{ position: 'absolute', top: 120, left: 22, fontSize: 17, fontWeight: 400 }}>Available Balance</Text>

          <View style={styles.container2}>
            <Image source={coinsImagePath} style={styles.coinImage} />
            <Text style={styles.coinCount}>{userData.jCoins}</Text>
          </View>

          <View
            style={{
              borderBottomColor: 'black', // Change this to your desired line color
              borderBottomWidth: 0.5, // Adjust the width of the line
              width: '90%', // Adjust the width of the line
              top: -38
              //marginVertical: 10, // Add margin top and bottom as needed
            }}
          />

          <Text style={{ position: 'absolute', top: 215, left: 22 }}>Topup Wallet</Text>

          <View style={[styles.fields, { bottom: 200, right: 30, }]} overflow='hidden' >
            <TextInput style={{ color: 'black', right: 60, }}
              keyboardType="numeric"
              placeholder='Enter the Amount'
              placeholderTextColor='black'
              onChangeText={(text) => setWalletValue(text)}
              value={walletValue} />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => handleButtonPress(100)} style={[styles.button, { left: -40 }]}>
              <Text style={styles.buttonText}>100</Text>
              <Image
                source={require('./jiitcafeassests/jcoins.png')}
                style={styles.buttonImage}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleButtonPress(200)} style={[styles.button, { left: -20 }]}>
              <Text style={styles.buttonText}>200</Text>
              <Image
                source={require('./jiitcafeassests/jcoins.png')}
                style={styles.buttonImage}
              />
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            onPress={topUpWallet}
            style={[styles.roundedBox,
            { width: 320, height: 60, backgroundColor: '#FBA834', bottom: 30, top: 370, borderColor: 'transparent' }]}
          >
            <Text style={{ color: 'white', alignItems: 'center', fontSize: 20 }} >Proceed to Topup</Text>
          </TouchableOpacity>



        </View>
        <StatusBar style="auto" />
        <NativeBaseProvider>

          <BottomTabAdmin focussedIndex={3} />
        </NativeBaseProvider>
      </ImageBackground></KeyboardAvoidingView>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },

  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -33,
    left: -100,
    padding: 10,
    //backgroundColor: '#FFFFFF',
    borderRadius: 8,
    //borderWidth: 1,
    //borderColor: '#CCCCCC',
  },
  coinImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    //resizeMode: 'contain',
  },
  coinCount: {
    fontSize: 40,
    fontWeight: 'bold',
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

  button: {
    // flex:1,
    flexDirection: 'row',
    top: 76,
    left: -80
    ,
    width: 100,
    height: 35,
    borderRadius: 20, // Half of width/height for a round button
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonImage: {
    width: 30, // Adjust image width as needed
    height: 30, // Adjust image height as needed
    //resizeMode: 'contain',
    //marginVertical: 5,
  },
  roundedBox: {
    position: 'absolute', // Change the position to absolute
    top: 180,
    bottom: 230,
    width: 350, // Adjust the width as needed
    height: 450, // Adjust the height as needed
    backgroundColor: 'transparent', // Background color of the box
    borderWidth: 1,
    borderRadius: 30, // Adjust the borderRadius to control the roundness
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },

  fields: {
    position: 'absolute', // Change the position to absolute
    top: 240,
    bottom: 380,
    left: 15,
    right: 30,
    textAlign: 'Center',
    width: 320, // Adjust the width as needed
    height: 70, // Adjust the height as needed
    // backgroundColor: 'black', // Background color of the box
    borderColor: 'black', // Border color
    borderWidth: 1, // Border width
    borderRadius: 5, // Adjust the borderRadius to control the roundness
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