import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabAdmin } from './components/bottomTabAdmin.js';


export default function RechargeMain() {

  function truncateText(text, maxLength) {
        if (text.length > maxLength) {
           return text.substring(0, maxLength) ;
         }
         return text;
  }

  const navigation = useNavigation();


  const [storedButton, setStoredButton] = useState(null);

  const handleButtonPress = () => {
    
    const buttonInfo = {
      text: '100',
      imagePath: require('./jiitcafeassests/jcoins.png'), 
    };
    setStoredButton(buttonInfo);
  };

  const availableCoinsCount = 0;
  // Path to your coins image (replace 'path-to-your-image' with your actual image path)
  const coinsImagePath = require('./jiitcafeassests/jcoins.png');

  const [enrollmentNo, getEnrollmentNo] = useState('');

  const enrollmentNum = (newText) => {
    newText = truncateText(newText, 10);
    getEnrollmentNo(newText);
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior='height'
    keyboardShouldPersistTaps='always' // handle taps outside TextInput
    keyboardVerticalOffset={-500}
    >
    
    <SafeAreaView style={styles.container} keyboardShouldPersistTaps='always'>
    <Image
            source={require('./jiitcafeassests/cafelogo.png')} 
            style={{ width: 60, height: 60, position:'absolute', top: 35, left: 10 }} // Adjust the dimensions as needed
    />
        
          <Text style={{fontSize: 19, fontWeight: 'bold', position:'absolute', textAlign: 'left', left:74 ,top:55, color: 'black'}}>
            JIIT CAFE
          </Text>

<View style={styles.roundedBox} keyboardShouldPersistTaps='always'>

<Text style={{position: 'absolute', top: 45, left: 22,fontSize: 20, fontWeight: 500}}>Aditya</Text>


<Text style={{position: 'absolute', top: 78, left: 22,fontSize: 20, fontWeight: 500}}>9921103219</Text>


<View
      style={{
        borderBottomColor: 'black', // Change this to your desired line color
        borderBottomWidth: 0.5, // Adjust the width of the line
        width: '90%', // Adjust the width of the line
        top: -50
        //marginVertical: 10, // Add margin top and bottom as needed
      }}
    />

<Text style={{position: 'absolute', top: 120, left: 22,fontSize: 17, fontWeight: 400}}>Available Balance</Text>

<View style={styles.container2}>
      <Image source={coinsImagePath} style={styles.coinImage} />
      <Text style={styles.coinCount}>{availableCoinsCount}</Text>
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

<Text style={{position: 'absolute', top: 215, left: 22}}>Topup Wallet</Text>

<View style={[styles.fields, {bottom:200, right: 30,}]} overflow = 'hidden' >
  <TextInput style={{color: 'white', right: 60, }}
             keyboardType="numeric"
             placeholder='Enter the Amount' 
             placeholderTextColor= 'white' 
             onChangeText={enrollmentNum} 
             value={enrollmentNo} />
</View>

<View style ={{flexDirection: 'row'}}>
<TouchableOpacity onPress={handleButtonPress} style={[styles.button,{left: -40}]}>
      <Text style={styles.buttonText}>100</Text>
      <Image
        source={require('./jiitcafeassests/jcoins.png')} 
        style={styles.buttonImage}
      />
</TouchableOpacity>

<TouchableOpacity onPress={handleButtonPress} style={[styles.button,{left: -20}]}>
      <Text style={styles.buttonText}>200</Text>
      <Image
        source={require('./jiitcafeassests/jcoins.png')} 
        style={styles.buttonImage}
      />
</TouchableOpacity>

</View>

<TouchableOpacity 
           style={[styles.roundedBox, 
           {width: 320, height:60, backgroundColor:'#7762D2',bottom:30,top: 370}]} 
           //onPress={() => navigation.navigate('food')}
    >    
    <Text style={{color: 'white', alignItems:'center', fontSize: 20 }} >Proceed to Topup</Text>

</TouchableOpacity>



</View>

    <StatusBar style="auto" />
    <BottomTabAdmin focussedIndex={0} />
    </SafeAreaView></KeyboardAvoidingView>
    
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
    flexDirection:'row',
    top: 76,
    left: -80
    ,
    width: 100,
    height: 35,
    borderRadius: 20, // Half of width/height for a round button
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
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
      backgroundColor: '#D4CAFF', // Background color of the box
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
    textAlign:'Center',
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
