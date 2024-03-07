import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ImageBackground, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabAdmin } from './components/bottomTabAdmin.js';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Recharge() {
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  }

  const navigation = useNavigation();
  const [enrollmentNo, setEnrollmentNo] = useState('');

  const enrollmentNum = (newText) => {
    newText = truncateText(newText, 10);
    setEnrollmentNo(newText);
  };

  const handleRecharge = async () => {
    try {
      const response = await fetch('http://192.168.177.64:3000/adminAuth/userDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enrollmentNo: enrollmentNo,
        }),
      });
  
      if (response.ok) {
        const userData = await response.json();
        console.log('User Details:', userData);
        navigation.navigate('rechargeMain', { userData });
  
      } else {
        console.log('Error from server:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always'
      keyboardVerticalOffset={-500}
    >
      <ImageBackground source={require('./jiitcafeassests/mainbg.png')} style={styles.backgroundImage}>
        <SafeAreaView>
        <View style={styles.container}>
          <Image
            source={require('./jiitcafeassests/cafelogo.png')}
            style={styles.logo}
          />
          <Text style={styles.cafeTitle}>JIIT CAFE</Text>
          <View style={styles.roundedBox}>
            <Text style={styles.rechargeTitle}>Recharge</Text>
            <View style={styles.fields}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enrollment Number"
                placeholderTextColor='black'
                onChangeText={enrollmentNum}
                value={enrollmentNo}
              />
            </View>
            <View style={styles.proceedButtonContainer}>
              <TouchableOpacity
                style={styles.proceedButton}
                onPress={handleRecharge}
              >
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <StatusBar style="auto" />
        </SafeAreaView>
        <NativeBaseProvider>
          <BottomTabAdmin focussedIndex={3} />
        </NativeBaseProvider>
        
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
   // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    top: 35,
    width: 100,
    height: 100,
  },
  cafeTitle: {
    top: 35,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginTop: 5,
  },
  roundedBox: {
    
    top: 50,
    width: '85%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  rechargeTitle: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fields: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    color: 'black',
    fontSize: 18,
    width: '80%',
  },
  proceedButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedButton: {
    width: 220,
    height: 60,
    backgroundColor: '#FF8911',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
