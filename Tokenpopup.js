import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaintokenPage from './maintokenpage.js'; // Adjust the import path based on your project structure
import { useSelectedItems } from './SelectedItemsContext.js';


const TokenPopup = ({ isVisible, onClose }) => {
  return (
    <Modal transparent visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <MaintokenPage onClose={onClose}/>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop:50
  },
  modalContent: {
    padding: 0,
    height: '90%',
    marginTop:80,
    marginBottom: 100,
    width: '100%',
  }
});

export default TokenPopup;
