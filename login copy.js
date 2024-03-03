import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminComponent from './components/adminTab';
import UserComponent from './components/userTab'; 
import { useUser } from './userContext';

const Tab = createBottomTabNavigator();


export default function Login() {

  function truncateText(text, maxLength) {
        if (text.length > maxLength) {
           return text.substring(0, maxLength) ;
         }
         return text;
  }
 

  const navigation = useNavigation();

  const [enrollmentNo, getEnrollmentNo] = useState('');
  const [password, getPassword] = useState('');
  const [adminNo, getAdminNo] = useState(''); // New state for admin number
  const [selectedTab, setSelectedTab] = useState('Admin');

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
              inputRange: [0,2],
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
        const userResponse = await fetch('http://192.168.1.11:3000/auth/signin', {
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
    
    <SafeAreaView style={styles.container} keyboardShouldPersistTaps='always'>
        {/* Tab bar */}
                <Tab.Navigator
          screenOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            labelStyle: { fontSize: 16, fontWeight: 'bold'},
          }
        } tabBarPosition="10"
        >
          <Tab.Screen
            name="Admin"
            options={{
              tabBarLabel: 'Admin',
              tabBarIcon: ({ color }) => (
                <Image source={require('./jiitcafeassests/cart.png')} style={{ width: 24, height: 24, tintColor: color }} />
              ),
            }}
          >
            {() => <AdminComponent setSelectedTab={setSelectedTab} />}
          </Tab.Screen>
          <Tab.Screen
            name="User"
            options={{
              tabBarLabel: 'User',
              tabBarIcon: ({ color }) => (
                <Image source={require('./jiitcafeassests/cart.png')} style={{ width: 24, height: 24, tintColor: color }} />
              ),
            }}
          >
            {() => <UserComponent setSelectedTab={setSelectedTab} />}
          </Tab.Screen>
          </Tab.Navigator>

        {/* Display the corresponding component based on the selected tab */}
        {selectedTab === 'Admin' ? (
          <AdminComponent setSelectedTab={setSelectedTab} />
        ) : (
          <UserComponent setSelectedTab={setSelectedTab} />
        )}


    <SafeAreaView style={styles.curvedLine}/>
    <Image
        source={require('./imgs/jcafelogo1-removebg-preview.png')} 
        style={{ width: 70, height: 70, position:'absolute', top: 60, left: 40 }}
    />
    
      <Text style={{fontSize: 25, fontWeight: 'bold',position:'absolute', textAlign: 'left', left:125 ,top:75, color: 'black'}}>
        JIIT CAFE</Text>


       <View  keyboardShouldPersistTaps='always'>
       <Animated.View style={adminBoxStyle}>
          <Image source={require('./icons/id-card.png')} style={{ width: 40, height: 40, position: 'absolute', top: 65, left: 15 }} />
          <View style={[styles.fields, { bottom: 200, right: 30 }]} overflow='hidden'>
            <TextInput
              style={{ color: 'white', right: 60 }}
              keyboardType="numeric"
              placeholder='Admin No.'
              placeholderTextColor='white'
              onChangeText={adminNum}
              value={adminNo}
            />
          </View>

          <Image source={require('./icons/security.png')} style={{ width: 40, height: 40, position: 'absolute', top: 140, left: 15 }} />

          <View style={[styles.fields, { bottom: 120, right: 30 }]} overflow='hidden'>
            <TextInput
              style={{ color: 'white', right: 30 }}
              secureTextEntry={true}
              placeholder='Enter Admin Password'
              placeholderTextColor='white'
              onChangeText={passWord}
              value={password}
            />
          </View>

          <TouchableOpacity 
                       style={[styles.roundedBox, 
                       {width: 200, height:60, backgroundColor:'black',bottom:30}]} 
                       onPress={handleLogin}
                >
                    
                <Text style={{color: 'white', alignItems:'center', fontSize: 20 }} >Login</Text>

                </TouchableOpacity>

            <Image
                 source={require('./icons/profile.png')} 
                 style={{ width: 80, height: 80, position:'absolute', top: -40, left: 135 }} 
            />
          
        </Animated.View>

        <Animated.View style={[userBoxStyle,{backgroundColor:'turquoise'}]}>
        <Image
                source={require('./icons/id-card.png')} 
                style={{ width: 40, height: 40, position:'absolute', top: 65, left: 15 }}
            /> 
            <View style={[styles.fields, {bottom:200, right: 30,}]} overflow = 'hidden' >
              <TextInput style={{color: 'white', right: 60, }}
                         keyboardType="default"
                         placeholder='Enrollment No.' 
                         placeholderTextColor= 'white' 
                         onChangeText={enrollmentNum} 
                         value={enrollmentNo} />
            </View>

            <Image
                source={require('./icons/security.png')} 
                style={{ width: 40, height:40, position:'absolute', top: 140, left: 15 }}
            /> 

            <View style={[styles.fields, {bottom:120, right: 30,}]} overflow = 'hidden' >
              <TextInput style={{color: 'white', right: 30, }}
                         secureTextEntry={true} 
                         placeholder='Enter your Password'
                         placeholderTextColor= 'white'
                         onChangeText={passWord} 
                         value={password} />
            </View>
            
                <TouchableOpacity 
                       style={[styles.roundedBox, 
                       {width: 200, height:60, backgroundColor:'black',bottom:30}]} 
                       onPress={handleLogin}
                >
                    
                <Text style={{color: 'white', alignItems:'center', fontSize: 20 }} >Login</Text>

                </TouchableOpacity>

            <Image
                 source={require('./icons/profile.png')} 
                 style={{ width: 80, height: 80, position:'absolute', top: -40, left: 135 }} 
            />

             

            <Text style={{position:'absolute', bottom : -30}}>
                 Doesn't have an account? <Text style={{color: 'blue',}} onPress={() => navigation.navigate('signup')} >Sign up</Text>
            </Text>
        </Animated.View>
            

        </View>
    <StatusBar style="auto" />

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
      position: 'absolute', // Change the position to absolute
      bottom: 200,
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
