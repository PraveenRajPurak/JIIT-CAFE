import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminCartButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('adminCart'); 
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={require('../jiitcafeassests/cart2.png')} 
        style={{ width: 30, height: 30, position:'absolute', top: 50, right: 25 }} 
      />
    </TouchableOpacity>
  );
};

export default AdminCartButton;
