import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';

const RechargePopup = ({ isVisible, onClose }) => {
    const [orderPlacedMessage] = useState('Order Placed Successfully');

    return (
        <Modal isVisible={isVisible} animationIn="fadeIn" animationOut="fadeOut">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20,opacity:0.5,top:200,left:45 }}>
                    Recharge Successful!
                </Text>
                <Image
                    source={require('./jiitcafeassests/rechargeconfirm.gif')}
                    style={{ width: 200, height: 150, marginBottom: 20,left: 66,top:-15 }}
                />
                <TouchableOpacity onPress={onClose} style={{ padding: 10, backgroundColor: 'transparent',width: 40,height:40,position:'relative',alignItems:'center',top:-205,left:285 }}>
                <Image
                    source={require('./jiitcafeassests/close.png')}
                    style={{ width: 22, height: 22,bottom:7 }}
                />
                </TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        height: '30%',
        borderColor: 'black',
        borderRadius:25,
        width: '85%',
    }
});
export default RechargePopup;
