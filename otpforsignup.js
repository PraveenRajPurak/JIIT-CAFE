import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
//import { BottomTab } from './components/bottomTab';

export default function OtpforSignup() {

  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    }
    catch (error) {
      console.log("Error in Sending Otp : ", error);
    }
  };

  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;
      console.log(user);

      //check if user already exists or not
      const userDocument = await firestore().collection('users').doc(user.uid).get();
      if (userDocument.exists) {
        navigation.navigate("login");
      }

      else {
        // console.log("UID before navigating:", user.uid);
        navigation.navigate("signup", { uid: user.uid });
      }

    }
    catch (error) {
      console.log("Error in Verifying Otp : ", error);
    }
  };

  /* const [otp, setOTP] = useState('');
   const [enrollmentNumber, setEnrollmentNumber] = useState('');
   const [email, setEmail] = useState('');
   
    <Image source={require('./jiitcafeassests/otpicon.png')} style={{ width: 130, height: 140, position: 'absolute', top: 13 }} />
   
             <Text style={{ fontSize: 28, fontWeight: 'bold', top: -10, color: 'black' }}>
               OTP Verification
             </Text>
   
             <Text style={{ fontSize: 12,fontWeight:'700', top: -1, color: 'black' }}>
             We have sent the OTP code to your email id 
             </Text>
             <Text style={{ fontSize: 12,fontWeight:'700',  top: -1, color: 'black' }}>
             99********@mail.jiit.ac.in  
             </Text>
   
     useEffect(() => {
       // Retrieve enrollment number and email from AsyncStorage
       const retrieveData = async () => {
         const storedEnrollmentNumber = await AsyncStorage.getItem('enrollmentNumber');
         const storedEmail = await AsyncStorage.getItem('email');
         
         setEnrollmentNumber(storedEnrollmentNumber || '');
         setEmail(storedEmail || '');
       };
   
       retrieveData();
     }, []);
   
     const verifyOTP = async () => {
       try {
         await firebase.auth().signInWithEmailLink(email, otp);
   
         // OTP verification successful
         // Navigate to 'food.js' or perform any other action
         navigation.navigate('foods'); 
       } catch (error) {
         console.error('Error verifying OTP:', error.message);
       }
     };
   */

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='height'
      keyboardShouldPersistTaps='always'
      keyboardVerticalOffset={-500}
    >

      <ImageBackground source={require('./jiitcafeassests/otpbg.png')} style={styles.container} keyboardShouldPersistTaps='always'>

        <View style={styles.roundedBox} keyboardShouldPersistTaps='always'>

          <Image source={require('./jiitcafeassests/logosmall.png')} style={{ width: 180, height: 100, position: 'absolute', top: 13 }} />

          {!confirm ? (
            <>
              <Text style={{ fontSize: 23, fontWeight: 'bold', top: -30, color: 'black' }}>
                Sign Up With Phone Number
              </Text>
              <View style={[styles.fields, { bottom: 132, right: 30, borderRadius: 30, }]} overflow='hidden' >

                <TextInput style={{ color: 'black', fontSize: 16, opacity: 1, fontWeight: '500', textAlign: 'center' }}
                  keyboardType="string"
                  placeholder='Phone Number with +91'
                  placeholderTextColor='black'
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>

              <TouchableOpacity
                style={[styles.roundedBox,
                { width: 250, height: 60, backgroundColor: '#FF8911', borderWidth: 1, bottom: 30, top: 340 }]}
                onPress={signInWithPhoneNumber}
              >
                <Text style={{ color: 'black', alignItems: 'center', fontSize: 20 }} >Proceed</Text>
              </TouchableOpacity>

              <Text style={{ position: 'absolute', bottom: 5, fontWeight: 'bold', fontSize: 17 }}>
                Already have an account? <Text style={{ color: 'blue', }} onPress={() => navigation.navigate('login')}>Sign in</Text>
              </Text>
            </>
          ) : (
            <>
              <Text style={{ fontSize: 23, fontWeight: 'bold', top: -30, color: 'black' }}>
                Otp verification
              </Text>
              <View style={[styles.fields, { bottom: 132, right: 30, }]} overflow='hidden' >
                <TextInput style={{ color: 'black', fontSize: 18, opacity: 1, fontWeight: '500' }}
                  keyboardType="string"
                  placeholder='Enter OTP'
                  placeholderTextColor='black'
                  value={code}
                  onChangeText={setCode}
                />
              </View>
              <TouchableOpacity
                style={[styles.roundedBox,
                { width: 250, height: 60, backgroundColor: '#FF8911', borderWidth: 1, bottom: 30, top: 340 }]}
                onPress={confirmCode}
              >
                <Text style={{ color: 'black', alignItems: 'center', fontSize: 20 }} >Submit the OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <StatusBar style="auto" />
      </ImageBackground></KeyboardAvoidingView>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  fields: {
    position: 'absolute', // Change the position to absolute
    bottom: 380,
    right: 30,
    left: 30,
    height: 45, // Adjust the height as needed
    backgroundColor: 'transparent', // Background color of the box
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15, // Adjust the borderRadius to control the roundness
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
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
    backgroundColor: 'transparent', // Background color of the box
    borderRadius: 30, // Adjust the borderRadius to control the roundness
    borderColor: 'transparent',
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
