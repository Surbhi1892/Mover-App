import { createStackNavigator } from '@react-navigation/stack';
import {
  PayTRAddCardContainer,
  PayTRCardListContainer,
  PayTRPaymentContainer,
} from 'containers';
import React from 'react';
import { stackNavigatorScreenOptions } from './styles';

const Stack = createStackNavigator();

const PayTRNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackNavigatorScreenOptions}>
      <Stack.Screen name="PayTRCardList" component={PayTRCardListContainer} />
      <Stack.Screen name="PayTRAddCard" component={PayTRAddCardContainer} />
      <Stack.Screen name="PayTRPayment" component={PayTRPaymentContainer} />
    </Stack.Navigator>
  );
};

export default PayTRNavigator;
