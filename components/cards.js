//cards.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Flex, Button, AddIcon, MinusIcon } from "native-base";
import { useSelectedItems } from '../SelectedItemsContext.js';

export function Cards ({ imageUrl, dishName, coinCount, id, onCountChange }) {
    

    // fetching the initial count from the global state
    const { selectedItems } = useSelectedItems();
    const cardData = useSelectedItems();
    const initialCount = selectedItems.find((item) => item.id === id)?.count || 0;
    const [isAvailable, setIsAvailable] = useState();

    const [count, setCount] = useState(0);
    const prevCount = count;

    const handleIncrement = () => {
      //if(isAvailable){}
      const newCount = count + 1;
      setCount(newCount);
      onCountChange(id, newCount, prevCount);
    };
    

    const handleDecrement = () => {
      //if(isAvailable){}
      if (count > 0) {
        const newCount = count - 1;
        setCount(newCount);
        onCountChange(id, newCount, prevCount);
      }
    };

    /*const checkItemAvailability = async () => {
      try {
        const response = await fetch('http://192.168.1.104:3000/user/checkItemAvailability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
  
        const data = await response.json();
        console.log('Availability data:', data);
        setIsAvailable(data.isAvailable);
      } catch (error) {
        console.error('Error checking availability:', error);
        setIsAvailable(false);
      }
    };

    useEffect(() => {
      checkItemAvailability();
    }, [id]);*/

    
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        width="500"
        padding={4}
        borderWidth={0}
        //borderColor="coolGray.200"
        bg="white"
        rounded="lg"
        overflow="hidden"
        shadow={0}
        _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }}
        marginBottom={4}
      >
        <Box flex={1} marginLeft={5} marginRight={10}>
          <AspectRatio ratio={1/1}>
            <Image source={imageUrl} alt={dishName} resizeMode="cover" width="100%" height="100%" />
          </AspectRatio>
        </Box>
  
        <Box flex={2} marginLeft={1} flexDirection={'column'}>
  
  
          <HStack alignSelf={"flex-start"} alignItems="center" marginBottom={3} width={80}>
            <Text color="black" fontWeight="bold" fontSize="lg">
              {dishName}
            </Text>
            <View flexDirection={'row'} marginLeft={15} alignSelf={"right"}>
            <Text color="black" fontWeight="semibold" fontSize="lg">
             {coinCount}
            </Text>
            <Image source={require("japp/jiitcafeassests/jcoins.png")} alt="jcoin" width={5} height={5} marginLeft={0.5} top={1} />
            </View>
          </HStack>
  
          <HStack alignItems="center" space={4} borderWidth={1} borderColor="gray.300" p={2} width={"54%"} borderRadius={5}>
            <Button size="sm" variant="outline" colorScheme="teal" onPress={handleDecrement}>
              <MinusIcon />
            </Button>
            <Text fontSize="lg">{count}</Text>
            <Button size="sm" variant="outline" colorScheme="teal" onPress={handleIncrement}>
              <AddIcon />
            </Button>
          </HStack>
        </Box>
      </Box>
    );
  
};

