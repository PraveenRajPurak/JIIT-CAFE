import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import signupPage from './signup.js';
import loginPage from './login.js'; 
import foodPage from './food.js';
import orderUserPage from './ordersUser.js';
import orderAdminPage from './ordersAdmin.js';
import walletPage from './wallet.js';
import cartPage from './cart.js';
import stockPage from './stock.js';
import rechargePage from './recharge.js';
import orderPlacePage from './orderPlace.js';
import order2Page from './orders2List.js';
import order3Page from './orders3List.js';
import rechargeMainPage from './rechargeMain.js';
import adminCartPage from './adminCart.js'
import { OrdersProvider } from './stockContext.js';
import { AppRegistry } from 'react-native';
import { NativeBaseProvider, Text, Box } from "native-base";
import { SelectedItemsProvider } from './SelectedItemsContext.js';
import { OrdersContext } from './stockContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProvider } from './userContext.js';


AppRegistry.registerComponent('main', () => App);  // a crucial addition in the project to expicitly define app registration when other dependecies was interfering in the automatic registration of the app component in the expo build AppEntry.js file

//AsyncStorage.setItem('exampleKey', 'exampleValue'); // This is just an example, can be removed after confirming initialization

const Stack = createStackNavigator();

const App = () => {

  const handleCartChange = (updatedItems) => {
    // Update the state or perform any other actions in the food page
    // This function will be called whenever the cart is updated
    console.log('Cart has been updated in the food page:', updatedItems);
  };

  return (
    <UserProvider>
    <OrdersProvider>
    <NativeBaseProvider>
      <SelectedItemsProvider onCartChange={handleCartChange}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signup">
        <Stack.Screen name="signup" options={{ headerShown: false }} component={signupPage} />
        <Stack.Screen name="login" options={{ headerShown: false }} component={loginPage} />
        <Stack.Screen name="food" options={{ headerShown: false }} component={foodPage} />
        <Stack.Screen name="cart" options={{ headerShown: false }} component={cartPage}/>
        <Stack.Screen name="ordersUser" options={{ headerShown: false }} component={orderUserPage}/>
        <Stack.Screen name="wallet" options={{ headerShown: false }} component={walletPage}/>
        <Stack.Screen name="stock" options={{ headerShown: false }} component={stockPage}/>
        <Stack.Screen name="recharge" options={{ headerShown: false }} component={rechargePage}/>
        <Stack.Screen name="orderPlace" options={{ headerShown: false }} component={orderPlacePage}/>
        <Stack.Screen name="ordersAdmin" options={{ headerShown: false }} component={orderAdminPage}/>
        <Stack.Screen name="orders2" options={{ headerShown: false }} component={order2Page}/>
        <Stack.Screen name="orders3" options={{ headerShown: false }} component={order3Page}/>
        <Stack.Screen name="adminCart" options={{ headerShown: false }} component={adminCartPage}/>
        <Stack.Screen name="rechargeMain" options={{ headerShown: false }} component={rechargeMainPage}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SelectedItemsProvider>
    </NativeBaseProvider>
    </OrdersProvider>
    </UserProvider>
    
  );
};

export default App;

