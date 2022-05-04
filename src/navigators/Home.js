import { createStackNavigator } from '@react-navigation/stack';
import {
  DashboardContainer,
  NotificationsContainer,
  WeightBalanceContainer,
} from 'containers';
import React from 'react';
import { stackNavigatorScreenOptions } from './styles';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={stackNavigatorScreenOptions}>
    <Stack.Screen name="Dashboard" component={DashboardContainer}
     />
    <Stack.Screen
      name="Notifications"
      component={NotificationsContainer}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="WeightBalance"
      component={WeightBalanceContainer}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default HomeNavigator;
