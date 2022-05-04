import { createStackNavigator } from '@react-navigation/stack';
import {
  OrderCreateContainer,
  OrderDetailContainer,
  OrdersContainer,
} from 'containers';
import React from 'react';
import { stackNavigatorScreenOptions } from './styles';

const Stack = createStackNavigator();

const OrdersNavigator = () => (
  <Stack.Navigator screenOptions={stackNavigatorScreenOptions}>
    <Stack.Screen
      name="OrdersList"
      component={OrdersContainer}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="OrderCreate" component={OrderCreateContainer}
    options={{ headerShown: false }} />
    <Stack.Screen
      name="OrderDetail"
      component={OrderDetailContainer}
      options={{
        headerStyle: {
          backgroundColor: 'black',
          shadowOpacity: 0,
        },
        headerTintColor: 'white',
      }}
    />
  </Stack.Navigator>
);

export default OrdersNavigator;
