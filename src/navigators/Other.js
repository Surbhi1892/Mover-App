import { createStackNavigator } from '@react-navigation/stack';
import {
  BalanceContainer,
  CourierDeliveryLocation,
  CourierOrdersContainer,
  ExternalAddresses,
  TermsOfShipping,
  NewCourierOrderContainer,
  NewsContainer,
  InquiryContainer,
  NewsDetailContainer,
  MapContainer,
  OthersContainer,
  ProfileContainer,
  NewInquiry,
} from 'containers';
import React from 'react';
import { stackNavigatorScreenOptions } from './styles';

const Stack = createStackNavigator();

const OtherNavigators = () => (
  <Stack.Navigator screenOptions={stackNavigatorScreenOptions}>
    <Stack.Screen name="Main" component={OthersContainer} />
    <Stack.Screen name="ExternalAddresses" component={ExternalAddresses}       options={{ headerShown: false }}
 />
    <Stack.Screen
      name="TermsOfShipping"
      component={TermsOfShipping}
      options={{ headerShown: false }}
    />
    {/* PROFILE */}
    <Stack.Group>
      <Stack.Screen
        name="Profile"
        component={ProfileContainer}
        options={{ headerShown: false }}
      />
    </Stack.Group>
    {/* COURIER ORDER */}
    <Stack.Group>
      <Stack.Screen
        name="CourierOrders"
        component={CourierOrdersContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewCourierOrder"
        component={NewCourierOrderContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapContainer"
        component={MapContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CourierDeliveryLocation"
        component={CourierDeliveryLocation}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
    </Stack.Group>

    <Stack.Group>
      <Stack.Screen
        name="InquiryContainer"
        component={InquiryContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewInquiry"
        component={NewInquiry}
        options={{ headerShown: false }}
      />
    </Stack.Group>
    {/* NEWS */}
    <Stack.Group>
      <Stack.Screen
        name="News"
        component={NewsContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailContainer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Group>
    {/* BALANCE */}
    <Stack.Group>
      <Stack.Screen name="Balance" component={BalanceContainer}
              options={{
                headerShown: false,
              }}
       />
    </Stack.Group>
  </Stack.Navigator>
);

export default OtherNavigators;
