import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, Animated, ImageBackground } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FrontPage() {

  const navigation = useNavigation();

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

          <TouchableOpacity style={{ position: 'relative', top: 280, right: 170 }} onPress={() => navigation.navigate('OtpForSignUp')}>
            <View style={styles.roundedBox} keyboardShouldPersistTaps='always'>

              <Text style = {{color: 'black', fontSize: 20,left:45,fontWeight:'bold'}}>
              Continue as User</Text>
              <Image
                source={require('./jiitcafeassests/userAnm.gif')}
                style={{ width: 100, height: 100, position: 'absolute', top: 43, left: 15 }}
              />

            </View>

          </TouchableOpacity>

          <TouchableOpacity style={{ position: 'relative', top: 550, right: 170 }} onPress={() => navigation.navigate('loginAdmin')}>
            <View style={styles.roundedBox} keyboardShouldPersistTaps='always'>

            <Text style = {{color: 'black', fontSize: 20,left:-56,fontWeight:'bold'}}>
              Continue as Admin</Text>
              <Image
                source={require('./jiitcafeassests/adminanm.gif')}
                style={{ width: 100, height: 100, position: 'absolute', top: 43, left: 235 }}
              />

            </View>

          </TouchableOpacity>
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
    height: 180, // Adjust the height as needed
    backgroundColor: 'white', // Background color of the box
    
    borderColor: 'black',
    borderRadius: 30, // Adjust the borderRadius to control the roundness
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    elevation:5,
    opacity:0.9
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
