//swipeList.js
import React, { useState, useEffect } from 'react';
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Dimensions,
} from 'react-native';

import { useSelectedItems } from '../SelectedItemsContext.js';
import { SwipeListView } from 'react-native-swipe-list-view';

export default function SwipeValueBasedUi() {

    let keyCounter = 0; // Initialize a counter

    const screenWidth = Dimensions.get('window').width;
    const screenLength = Dimensions.get('window').height;
    const { selectedItems, removeItemFromCart, cardData } = useSelectedItems();
    const [listData, setListData] = useState(selectedItems);
    const { addOrUpdateItemInCart } = useSelectedItems();

    const handleAddToCart = (itemId) => {
        addOrUpdateItemInCart(itemId);
    };

    useEffect(() => {
        setListData(selectedItems.map(item => ({ ...item, key: item.key })));
    }, [selectedItems]);


    // Create a map to store the Animated.Values
    const rowSwipeAnimatedValues = {};
    selectedItems.forEach((item) => {
        rowSwipeAnimatedValues[item.key] = new Animated.Value(0);
    });

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };


    const deleteRow = (rowMap, rowKey) => {
        console.log('Deleting row with key:', rowKey);
        console.log('Selected Items before deletion:', selectedItems);
        // Remove the swiped item from listData
        setListData((prevListData) =>
            prevListData.filter((item) => item.key !== rowKey)
        );

        // Remove the swiped item from selectedItems context
        removeItemFromCart(rowKey);

        // Close the row after updating state and context
        closeRow(rowMap, rowKey);
    };



    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        if (rowSwipeAnimatedValues[key]) {
            rowSwipeAnimatedValues[key].setValue(Math.abs(value));
        }
    };


    const renderItem = data => (


        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View key={data.item.id} style={[styles.cartItem, { width: screenWidth - 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Image source={data.item.imageUrl} style={styles.image} />
                    <Text style={styles.text}>{data.item.dishName} x {data.item.count}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 140 }}>
                    <Text style={styles.text}>{parseInt(data.item.coinCount) * parseInt(data.item.count)}</Text>
                    <Image
                        source={require('../jiitcafeassests/jcoins.png')}
                        style={{ width: 28, height: 28 }}
                    />
                </View>
            </View>

        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>

            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => {
                    console.log('Deleting row with key:', data.item.key);
                    deleteRow(rowMap, data.item.key)
                }
                }
            >
                <Animated.View
                    style={[
                        styles.trash,
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[data.item.key].interpolate({
                                        inputRange: [45, 90],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Image
                        source={require('../icons/boy.png')}
                        style={styles.trash}
                    />

                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    return (


        <View style={styles.container}>


            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-70}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
                onSwipeValueChange={onSwipeValueChange}
                keyExtractor={(item) => item.key}
                ref={(ref) => (swipeListViewRef = ref)}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'transparent', //f5f5f5
        flex: 1,
        marginBottom: 380,
        marginTop: -20
    },

    backTextWhite: {
        color: '#FFF',
    },

    rowFront: {
        marginVertical: 0,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'white',
        borderBottomWidth: 15,
        justifyContent: 'center',
        height: 80,
    },

    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },

    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },

    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },

    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },

    trash: {
        height: 25,
        width: 25,
    },

    cartItem: {
        flexDirection: 'row', // Items will be displayed in a row
        alignItems: 'center', // Center items vertically
        justifyContent: 'flex-start', // Distribute items evenly
        margin: 10,
        marginHorizontal: 0, // Adjust the vertical margin as needed
        padding: 0, // Add padding for spacing and visual appeal
        backgroundColor: 'white', // Background color of the cart item
        borderRadius: 10, // Add border radius for rounded corners
    },


    image: {
        width: 50, // Adjust the image width as needed
        height: 50, // Adjust the image height as needed
        marginRight: 10, // Spacing between the image and text
        borderRadius: 5, // Add border radius to the image
    },


    text: {
        fontSize: 16, // Adjust the text font size as needed
        fontWeight: 'bold', // Text style
    },

});
