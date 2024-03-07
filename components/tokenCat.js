import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Flex, Button, AddIcon, MinusIcon, useColorModeValue  } from "native-base";
import { TabView, SceneMap } from 'react-native-tab-view';
import Constants from 'expo-constants';
import { useNavigation, useFocusEffect} from '@react-navigation/native';

const initialLayout = {
  width: Dimensions.get('window').width
};

export function Tokentop({ focussedIndex }) {
  const [index, setIndex] = React.useState(focussedIndex);

  const initialLayout = { width: Dimensions.get('window').width };

  const handlePress = (i) => {
    setIndex(i);
  };

  const renderTabBar = ({ navigationState }) => {
    const navigation = useNavigation();
  
    return (
      <Box flexDirection="row">
        {navigationState.routes.map((route, i) => (
          <Pressable
            key={route.key}
            onPress={() => {
              handlePress(i);
           
              navigation.navigate(route.navigTo);
 
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              height: 50,
              backgroundColor: index === i ? '#FBA834' : '#FDBF60',
              justifyContent: 'center',
            }}
          >
            <Text color="black">{route.title}</Text>
          </Pressable>
        ))}
      </Box>
    );
  };
  

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <Center flex={1} my="4" />;
      case 'second':
        return <Center flex={1} my="4" />;
      case 'third':
        return <Center flex={1} my="4" />;
      default:
        return null;
    }
  };

  return (
    <TabView
    navigationState={{ index, routes: [
      { key: 'first', title: 'Current', navigTo: 'currentAdminOrders' },
      { key: 'second', title: 'Used', navigTo: 'usedAdminOrders' },
      { key: 'third', title: 'Unused', navigTo: 'unusedAdminOrders' },
    ]}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{
        position: 'absolute',
        top: 105,
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
      }}
    />
  );
}
