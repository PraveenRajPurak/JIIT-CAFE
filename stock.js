import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { StyleSheet, View, SafeAreaView, Image, TextInput, Flex } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { BottomTabAdmin } from './components/bottomTabAdmin.js';
//import AdminCartButton from './components/AdminCartButton.js';
//import { Center } from 'native-base';
import { NativeBaseProvider, Box, Center } from "native-base";
import StockUpdatePopup from './stockUpdatePopup.js';
import StockAddPopup from './stockAddPopup.js';

export default function Stock() {

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const [isOrderPlacedPopupVisible, setOrderPlacedPopupVisible] = useState(false);
  const [isAddPopupVisible, setAddPopupVisible] = useState(false);

  useEffect(() => {
    fetch('http://192.168.177.64:3000/adminAuth/stockfetch')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);

        const initialInputValues = {};
        data.forEach((item) => {
          initialInputValues[item.itemid] = '';
        });
        setInputValues(initialInputValues);
      })
      .catch((error) => console.error('Error fetching stock data:', error));
  }, []);



  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = items.filter(
      (item) =>
        item.itemName.toLowerCase().includes(text.toLowerCase()) ||
        item.itemid.includes(text)
    );
    setFilteredItems(filtered);
  };

  const handleInputChange = (itemId, inputValue) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [itemId]: inputValue,
    }));
  };

  const handleAddStock = async (itemId) => {
    const inputValue = parseInt(inputValues[itemId] || 0);
    console.log('Updating stock for item:', itemId, 'with value:', inputValue);

    try {
      // Call the API to update stock
      const response = await fetch('http://192.168.177.64:3000/adminAuth/addStock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          updatedStock: inputValue,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Fetch updated stock data after successful update
        fetch('http://192.168.177.64:3000/adminAuth/stockfetch')
          .then((response) => response.json())
          .then((updatedData) => {
            setItems(updatedData);
            setFilteredItems(updatedData);
          })
          .catch((error) => console.error('Error fetching updated stock data:', error));

        // Update the local state or perform any other actions
        console.log('Stock updated successfully:', data.updatedItem);

        setAddPopupVisible(true);

        setTimeout(() => {
          setAddPopupVisible(false);
          { showTokenPopup: true };
        }, 6000);
      }
       else {
        console.error('Error updating stock:', data.error);
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };


  const handleDeleteStock = async (itemId) => {
    const inputValue = parseInt(inputValues[itemId] || 0);
    console.log('Deleting stock for item:', itemId, 'with value:', inputValue);

    try {
      // Call the API to delete stock
      const response = await fetch('http://192.168.177.64:3000/adminAuth/deleteStock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          deletedStock: inputValue,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Fetch updated stock data after successful deletion
        fetch('http://192.168.177.64:3000/adminAuth/stockfetch')
          .then((response) => response.json())
          .then((updatedData) => {
            setItems(updatedData);
            setFilteredItems(updatedData);
          })
          .catch((error) => console.error('Error fetching updated stock data:', error));

        // Update the local state or perform any other actions
        console.log('Stock deleted successfully:', data.updatedItem);

        setOrderPlacedPopupVisible(true);

        setTimeout(() => {
          setOrderPlacedPopupVisible(false);
          { showTokenPopup: true };
        }, 6000);

      } else {
        console.error('Error deleting stock:', data.error);
      }
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };



  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='height' keyboardShouldPersistTaps='always' keyboardVerticalOffset={-500}>

      {isOrderPlacedPopupVisible && (
        <StockUpdatePopup isVisible={isOrderPlacedPopupVisible} onClose={() => setOrderPlacedPopupVisible(false)} />
      )}
      {isAddPopupVisible && (
        <StockAddPopup isVisible={isAddPopupVisible} onClose={() => setAddPopupVisible(false)} />
      )}
      <ImageBackground source={require('./jiitcafeassests/mainbg.png')} style={styles.backgroundImage}>

        <SafeAreaView style={styles.container}>
          <Image source={require('./jiitcafeassests/cafelogo.png')} style={{ width: 60, height: 60, position: 'absolute', top: 35, left: 10 }} />
          <Text style={{ fontSize: 19, fontWeight: 'bold', position: 'absolute', textAlign: 'left', left: 74, top: 55, color: 'black' }}>
            JIIT CAFE
          </Text>
          <TextInput
            style={styles.searchBar}
            placeholder="Search by name or ID"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <StatusBar style="auto" />

          <ScrollView style={styles.containerScoll}>
            {filteredItems
              .sort((a, b) => a.itemid - b.itemid)
              .map((item) => (
                <View key={item.itemid} style={styles.cardContainer}>
                  <Card key={item.itemid}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.itemTitle}>
                        {item.itemid}: {item.itemName}
                      </Text>
                      <Text style={styles.stockText}>Stock: {item.quantity}</Text>
                    </View>
                    <View style={styles.cardBody}>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.inputField}
                          placeholder="Update Stock"
                          keyboardType="numeric"
                          value={inputValues[item.itemid]}
                          onChangeText={(text) => handleInputChange(item.itemid, text)}
                        />
                      </View>
                      <View style={styles.addButtonContainer}>
                        <Button
                          title="Add"
                          color="black"
                          onPress={() => {
                            handleAddStock(item.itemid);
                          }}
                          buttonStyle={styles.addButton}
                        />
                      </View>
                      <View style={styles.deleteButtonContainer}>
                        <Button
                          title="Delete"
                          color="black"
                          onPress={() => {
                            handleDeleteStock(item.itemid);
                          }}
                          buttonStyle={styles.deleteButton}
                        />
                      </View>
                    </View>
                  </Card>
                </View>
              ))}
          </ScrollView>
          <NativeBaseProvider>
            <BottomTabAdmin focussedIndex={0} />
          </NativeBaseProvider>
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );

}



const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
  },
  searchBar: {
    top: 102,
    marginBottom: 15,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    //marginBottom: 40,
    backgroundColor: 'transparent'
  },

  container2: {
    flex: 1,
    margin: 0
  },


  containerScoll: {
    position: 'relative',
    top: 100,
    marginBottom: 100,
    height: 667
  },

  cardContainer: {
    height: 135,
    marginBottom: 20,

  },
  cardHeader: {
    flexDirection: 'column',
    height: 200,
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stockText: {
    fontSize: 20,
    top: 22,
  },
  cardBody: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 220,
    //alignItems: 'center',
    position: 'absolute',
    top: 2,
    left: 250
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
    position: 'absolute',
    top: 0,
    right: 10
  },
  inputField: {
    position: 'absolute',
    top: 0,
    right: 45,
    width: 110,
    height: 65,
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginRight: 10,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 20,
    padding: 5,
  },

  addButton: {
    backgroundColor: '#387ADF',
    width: 90,
    borderRadius: 17,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  },
  addButtonContainer: {
    position: 'abosolute',
    top: 70,
    right: 22,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
  },
  deleteButtonContainer: {
    position: 'absolute',
    top: 70,
    right: 112,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#D04848',
    width: 90,
    borderRadius: 17,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
});