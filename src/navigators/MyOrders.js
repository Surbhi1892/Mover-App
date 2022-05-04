import { createStackNavigator, HeaderBarItem } from '@react-navigation/stack';
import { MyOrdersContainer } from 'containers';
import { NewOrder } from 'containers';

import React from 'react';
import { stackNavigatorScreenOptions } from './styles';

const Stack = createStackNavigator();

const MyOrdersNavigators = () => (
  <Stack.Navigator screenOptions={stackNavigatorScreenOptions}>
    <Stack.Screen
      name="MyOrdersList"
      component={MyOrdersContainer}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NewOrder"
      component={NewOrder}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default MyOrdersNavigators;
