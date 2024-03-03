import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabAdmin } from './components/bottomTabAdmin.js';


export default function Recharge() {

  function truncateText(text, maxLength) {
        if (text.length > maxLength) {
           return text.substring(0, maxLength) ;
         }
         return text;
  }
 

  const navigation = useNavigation();

  const [enrollmentNo, getEnrollmentNo] = useState('');
  const [password, getPassword] = useState('');


  const enrollmentNum = (newText) => {
    newText = truncateText(newText, 10);
    getEnrollmentNo(newText);
  };

  const passWord = (newText) => {
    newText = truncateText(newText, 20);
    getPassword(newText);
  };


  const handleRecharge = async () => {
    try {
      // Make a request to check if the user exists
      const response = await fetch(`http://192.168.1.11:3000/auth/checkUser/${enrollmentNo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API Response:', response);
      const userData = await response.json();

      if (response.ok) {
        // User exists, proceed with recharge
        navigation.navigate('rechargeMain', { enrollmentNo });
      } else {
        // User doesn't exist, show a pop-up or alert
        Alert.alert('User Not Found', 'The user with the provided enrollment number does not exist.');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      // Handle other errors as needed
    }
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
            JIIT CAFE</Text>

       <View style={styles.roundedBox} keyboardShouldPersistTaps='always'>

            <Image
                source={require('./icons/id-card.png')} 
                style={{ width: 40, height: 40, position:'absolute', top: 65, left: 15 }}
            /> 
            <View style={[styles.fields, {bottom:200, right: 30,top: 62}]} overflow = 'hidden' >
              <TextInput style={{color: 'white', right: 60, }}
                         keyboardType="numeric"
                         placeholder='Enrollment No.' 
                         placeholderTextColor= 'white' 
                         onChangeText={enrollmentNum} 
                         value={enrollmentNo} />
            </View>
            
                <TouchableOpacity 
                       style={[styles.roundedBox, 
                       {width: 200, height:60, backgroundColor:'black',bottom:30,top: 125}]} 
                       onPress={navigation.navigate('rechargeMain')}
                >
                    
                <Text style={{color: 'white', alignItems:'center', fontSize: 20 }} >Proceed</Text>

                </TouchableOpacity>

            <Image
                 source={require('./icons/profile.png')} 
                 style={{ width: 80, height: 80, position:'absolute', top: -40, left: 135 }} 
            /> 

        </View>
    <StatusBar style="auto" />
    <BottomTabAdmin focussedIndex={4} />
    </SafeAreaView></KeyboardAvoidingView>
    
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
      position: 'absolute',
      top: 300,
      bottom: 230,
      width: 350, 
      height: 200, 
      backgroundColor: 'aqua', 
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
    borderRadius: 10, // Adjust the borderRadius to control the roundness
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
