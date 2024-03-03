// OrderList.js

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import OrderBox from './maintokenpage.js';

const OrderList = ({ orders }) => {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
        Pending Orders
      </Text>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(order) => order.orderId.toString()}
          renderItem={({ item }) => <OrderBox order={item} />}
        />
      ) : (
        <Text style={{ fontSize: 16, textAlign: 'center' }}>No pending orders found</Text>
      )}
    </View>
  );
};

export default OrderList;
