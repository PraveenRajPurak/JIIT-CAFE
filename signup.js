import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert,KeyboardAvoidingView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { useRoute } from '@react-navigation/native';
//import firestore from '@react-native-firebase/firestore';

export default function Signup({ route }) {

 const navigation = useNavigation();

 //const route = useRoute();

 //const { uid } = route.params;

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength);
    }
    return text;
  }

  const [name, setName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const nameSet = (newText) => {
    newText = truncateText(newText, 50);
    setName(newText);
  };

  const enrollmentNoSet = (newText) => {
    newText = truncateText(newText, 10);
    setEnrollmentNo(newText);
  };

  const passwordSet = (newText) => {
    newText = truncateText(newText, 20);
    setPassword(newText);
  };

  const passwordConfirm = (newText) => {
    newText = truncateText(newText, 20);
    setConfirmPassword(newText);
  };
/*
  const saveDetails = async () => {
    try {
      await firestore().collection('users').doc(uid).set({
        name,
        enrollmentNo,
      });

    }
    catch (error) {
      console.log("Error in Saving Details : ", error);
    }
  };
*/
  const handleSignUp = async () => {
    try {
      const response = await fetch('http://192.168.1.11:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          enrollmentNo,
          password,
        }),
      });
      const data = await response.json();
      console.log(data); // Log the response from the server
      navigation.navigate('login');
    } catch (error) {
      Alert.alert('User already exists. Please sign in.');
      console.error('Error signing up:', error);
    }
  };

  const Signupbutton = async () => {
   await saveDetails();
   await handleSignUp();
  }
 

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

          <View style={styles.roundedBox} keyboardShouldPersistTaps='always'>

            <Image
              source={require('./icons/boy.png')}
              style={{ width: 40, height: 40, position: 'absolute', top: 60, left: 15 }} // Adjust the dimensions as needed
            />
            <View style={[styles.fields, { bottom: 380, right: 30, }]} overflow='hidden' >
              <TextInput style={{ color: 'black', right: 50, left: -45, }}
                numberOfLines={1}
                keyboardType="default" // Specify the keyboard type here 
                placeholder='Enter your Name'
                placeholderTextColor='black'
                onChangeText={nameSet}
                value={name} />
            </View>

            <Image
              source={require('./icons/id-card.png')}
              style={{ width: 40, height: 40, position: 'absolute', top: 145, left: 15 }} // Adjust the dimensions as needed
            />
            <View style={[styles.fields, { bottom: 300, right: 30, }]} overflow='hidden' >
              <TextInput style={{ color: 'black', right: 50, }}
                keyboardType="numeric" // Specify the keyboard type here 
                placeholder='Enrollment No.'
                placeholderTextColor='black'
                onChangeText={enrollmentNoSet}
                value={enrollmentNo} />
            </View>

            <Image
              source={require('./icons/security.png')}
              style={{ width: 40, height: 40, position: 'absolute', top: 220, left: 15 }} // Adjust the dimensions as needed
            />
            <View style={[styles.fields, { bottom: 220, right: 30, }]} overflow='hidden' >
              <TextInput style={{ color: 'black', right: 55, }}
                secureTextEntry={true}
                placeholder='Set Password'
                placeholderTextColor='black'
                onChangeText={passwordSet}
                value={password} />
            </View>

            <Image
              source={require('./icons/password.png')}
              style={{ width: 70, height: 70, position: 'absolute', top: 285, left: 6 }} // Adjust the dimensions as needed
            />
            <View style={[styles.fields, { bottom: 140, right: 30, }]} overflow='hidden' >
              <TextInput style={{ color: 'black', right: 40, }}
                secureTextEntry={true}
                placeholder='Confirm Password'
                placeholderTextColor='black'
                onChangeText={passwordConfirm}
                value={confirmPassword} />
            </View>


            <TouchableOpacity
              style={[styles.roundedBox,
              { width: 200, height: 60, backgroundColor: 'transparent',borderWidth:0.75, borderColor:'black', borderRadius: 30, bottom: 40 }]}
              onPress={handleSignUp}>

              <Text style={{ color: 'black', alignItems: 'center', fontSize: 24,fontWeight:'bold' }} >Sign up</Text>

            </TouchableOpacity>

            <Text style={{ position: 'absolute', bottom: -30 }}>
              Already have an account? <Text style={{ color: 'blue', }} onPress={() => navigation.navigate('login')}>Sign in</Text>
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
    bottom: 150,
    width: 350, // Adjust the width as needed
    height: 480, // Adjust the height as needed
    backgroundColor: 'transparent', // Background color of the box
    borderWidth:0.75,
    borderColor:'black',
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
    color:'black',
    borderWidth:0.8,

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