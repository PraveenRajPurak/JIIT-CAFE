import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, Animated, ImageBackground } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminComponent from './components/adminTab';
import UserComponent from './components/userTab';
import { useUser } from './userContext';

const Tab = createBottomTabNavigator();


export default function Login() {

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  }

  const navigation = useNavigation();

  const [enrollmentNo, getEnrollmentNo] = useState('');
  const [password, getPassword] = useState('');
  const [adminNo, getAdminNo] = useState(''); // New state for admin number
  const [selectedTab, setSelectedTab] = useState('User');

  /*

   <TouchableOpacity style={{ top: 270, borderWidth: 1, borderRadius: 10, borderColor: 'black', padding: 10, width: 200, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
          onPress={() => navigation.navigate('OtpForLogin')}>
          <Text>Touch this to go to heaven</Text>
        </TouchableOpacity>

  <Image
                  source={require('./icons/id-card.png')}
                  style={{ width: 40, height: 40, position: 'absolute', top: 65, left: 15 }}
                />
                <View style={[styles.fields, { bottom: 200, right: 30, }]} overflow='hidden' >
                  <TextInput style={{ color: 'white', right: 60, }}
                    keyboardType="default"
                    placeholder='Enrollment No.'
                    placeholderTextColor='white'
                    onChangeText={enrollmentNum}
                    value={enrollmentNo} />
                </View>
  
                <Image
                  source={require('./icons/security.png')}
                  style={{ width: 40, height: 40, position: 'absolute', top: 140, left: 15 }}
                />
  
                <View style={[styles.fields, { bottom: 120, right: 30, }]} overflow='hidden' >
                  <TextInput style={{ color: 'white', right: 30, }}
                    secureTextEntry={true}
                    placeholder='Enter your Password'
                    placeholderTextColor='white'
                    onChangeText={passWord}
                    value={password} />
                </View>
  
                <TouchableOpacity
                  style={[styles.roundedBox,
                  { width: 200, height: 60, backgroundColor: 'black', bottom: 30 }]}
                  onPress={handleLogin}
                >
  
                  <Text style={{ color: 'white', alignItems: 'center', fontSize: 20 }} >Login</Text>
  
                </TouchableOpacity>
  
                <Image
                  source={require('./icons/profile.png')}
                  style={{ width: 80, height: 80, position: 'absolute', top: -40, left: 135 }}
                />
  
  
  
                <Text style={{ position: 'absolute', bottom: -30 }}>
                  Doesn't have an account? <Text style={{ color: 'blue', }} onPress={() => navigation.navigate('signup')} >Sign up</Text>
                </Text>
  */
  // Animation setup
  const slideAnim = useRef(new Animated.Value(0)).current;

  const slideBox = (toValue) => {
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideBox(selectedTab === 'Admin' ? 0 : 1);
  }, [selectedTab]);


  const adminBoxStyle = [
    styles.roundedBox,
    {
      transform: [
        {
          translateX: slideAnim.interpolate({
            inputRange: [-1, 1],
            outputRange: [0, selectedTab === 'Admin' ? -350 : 350],
          }),
        },
      ],
    },
  ];

  const userBoxStyle = [
    styles.roundedBox,
    {
      transform: [
        {
          translateX: slideAnim.interpolate({
            inputRange: [0, 2],
            outputRange: [210, selectedTab === 'User' ? -560 : 350],
          }),
        },
      ],
    },
  ];

  const adminNum = (newText) => {
    newText = truncateText(newText, 10);
    getAdminNo(newText);
  };

  const enrollmentNum = (newText) => {
    newText = truncateText(newText, 10);
    getEnrollmentNo(newText);
  };

  const passWord = (newText) => {
    newText = truncateText(newText, 20);
    getPassword(newText);
  };

  const { updateUser } = useUser();

  const handleLogin = async () => {

    try {
      if (selectedTab === 'Admin') {
        navigation.navigate('stock');
        /*const adminResponse = await fetch('http://192.168.1.104:3000/adminAuth/signIn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adminNo,
            password,
          }),
        });
  
        console.log('Admin Response:', adminResponse); // Log the raw response
        const adminData = await adminResponse.json();
  
        if (!adminResponse.ok) {
          navigation.navigate('stock');
        } else {
          Alert.alert('Error', 'Incorrect admin credentials. Please try again.');
        }*/

      } else {
        const userResponse = await fetch('http://192.168.177.64:3000/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            enrollmentNo,
            password,
          }),
        });

        console.log('User Response:', userResponse); // Log the raw response

        const userData = await userResponse.json();
        console.log('User Data:', userData); // Log the parsed response

        if (userResponse.ok) {
          updateUser(userData); // Update the user context with the user data
          navigation.navigate('food');

        } else {
          Alert.alert('Error', 'Incorrect user credentials. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error signing in:', error);
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
      <ImageBackground source={require('./jiitcafeassests/loginbg.png')} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container} keyboardShouldPersistTaps='always'>
          
          <Image source={require('./jiitcafeassests/logosmall.png')} style={{ width: 150, height: 80, position: 'absolute', top: 130 }} />
          <Text style={{ fontSize: 23, fontWeight: 'bold', top: -145, color: 'black' }}>
                Order . Enjoy . Relax ...
              </Text>
          <View style={styles.roundedBox} keyboardShouldPersistTaps='always'>

            <Image
              source={require('./icons/id-card.png')}
              style={{ width: 40, height: 40, position: 'absolute', top: 43, left: 15 }}
            />
            <View style={[styles.fields, { bottom: 200, right: 30, }]} overflow='hidden' >
              <TextInput style={{ color: 'black', right: 60, }}
                keyboardType="default"
                placeholder='Enrollment No.'
                placeholderTextColor='black'
                onChangeText={enrollmentNum}
                value={enrollmentNo} />
            </View>

            <Image
              source={require('./icons/security.png')}
              style={{ width: 40, height: 40, position: 'absolute', top: 117, left: 15 }}
            />

            <View style={[styles.fields, { bottom: 120, right: 30, }]} overflow='hidden' >
              <TextInput style={{ color: 'black', right: 30, }}
                secureTextEntry={true}
                placeholder='Enter your Password'
                placeholderTextColor='black'
                onChangeText={passWord}
                value={password} />
            </View>

            <TouchableOpacity
              style={[styles.roundedBox,
              { width: 200, height: 60, backgroundColor: 'transparent', bottom: 30,top:194 }]}
              onPress={handleLogin}
            >

            <Text style={{ color: 'black', alignItems: 'center', fontSize: 24, fontWeight: 'bold' }} >Login</Text>

            </TouchableOpacity>

            <Text style={{ position: 'absolute', bottom: -30, fontWeight: 'bold' }}>
              Doesn't have an account? <Text style={{ color: 'blue', }} onPress={() => navigation.navigate('OtpForSignUp')} >Sign up</Text>
            </Text>

            <Text style={{ position: 'absolute', bottom: -70, fontWeight: 'bold',fontSize:20 }}>
              Login Using <Text style={{ color: 'blue', }} >OTP</Text>
            </Text>

            <Text style={{ position: 'absolute', bottom: 97, fontWeight: 'bold',left:200 }}>
              <Text style={{ color: 'black', }} >Forgot Password?</Text>
            </Text>

          </View>

          <StatusBar style="auto" />
         
        </SafeAreaView>
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
    bottom: 250,
    width: 350, // Adjust the width as needed
    height: 280, // Adjust the height as needed
    backgroundColor: 'transparent', // Background color of the box
    borderWidth: 0.75,
    borderColor: 'black',
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
    color: 'black',
    borderWidth: 0.8,

    backgroundColor: 'transparent', // Background color of the box
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
