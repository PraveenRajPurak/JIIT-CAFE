//cards.js
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Flex, Button, AddIcon, MinusIcon } from "native-base";
import { useSelectedItems } from '../SelectedItemsContext.js';
import { useUser } from '../userContext.js';

export function Cards ({ imageUrl, dishName, coinCount, id, onCountChange }) {

    // fetching the initial count from the global state
    const { selectedItems } = useSelectedItems();
    const initialCount = selectedItems.find((item) => item.id === id)?.count || 0;
    const [isAvailable, setIsAvailable] = useState(); // Default to true, assuming available initially

    const [count, setCount] = useState(0);
    const prevCount = count;

    useEffect(() => {
      // Check availability when the component mounts or when the itemId changes
      checkAvailability();
    }, [id]);

    const handleIncrement = () => {
      const newCount = count + 1;
      setCount(newCount);
      onCountChange(id, newCount, prevCount);
    };
    

    const handleDecrement = () => {
      if (count > 0) {
        const newCount = count - 1;
        setCount(newCount);
        onCountChange(id, newCount, prevCount);
      }
    };

    const checkAvailability = async () => {
      try {
        const response = await fetch('http://192.168.177.64:3000/user/checkItemAvailability', {
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


    
  return (
    <Box alignItems="center" w={'100%'}>
    <Box width="100%" maxWidth={330} mx={16} my={8}>
      <Box
        borderWidth={1}
        borderColor={isAvailable ? "coolGray.200" : "red.500"} // Adjust the border color based on availability
        bg="white"
        rounded="lg"
        overflow="hidden"
        shadow={2}
      >
        <AspectRatio ratio={4 / 3}>
          <Image source={imageUrl} alt={dishName} resizeMode="cover" w={'100%'} h={'100%'} />
        </AspectRatio>
        <Stack>
          <HStack space={2} alignItems="center" p={4} justifyContent="space-between">
            <Text style={{ color: isAvailable ? "black" : "red.500", fontWeight: 'bold', fontSize: 20 }}>{dishName}</Text>
            <Text style={{ color: "black", fontWeight: 'semibold', fontSize: 20 }}>{coinCount}</Text>
          </HStack>
          {isAvailable ? (
            <HStack justifyContent="center" mt={0} mx={0} space={4} paddingBottom={3}>
              <Button
                title="-"
                onPress={handleDecrement}
                disabled={count === 0}
              />
              <Text style={{ fontSize: 18, marginHorizontal: 8 }}>{count}</Text>
              <Button title="+" onPress={handleIncrement} />
            </HStack>
          ) : (
            <View /> // Render an empty View if not available
          )}
        </Stack>
      </Box>
    </Box>
  </Box>
  )
  
};

