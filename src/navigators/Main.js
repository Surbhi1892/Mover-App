import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'native-base';
import React from 'react';
import { useTheme } from 'theme';
import HomeNavigator from './Home';
import MyOrdersNavigators from './MyOrders';
import OrdersNavigator from './Orders';
import OtherNavigators from './Other';

const Tab = createBottomTabNavigator();

const HOME_SCREEN = 'Əsas';
const ORDERS_SCREEN = 'Bağlamalar';
const CART_SCREEN = 'Kart';
const MY_ORDERS_SCREEN = 'Sifarişlər';
const OTHER_SCREENS = 'Digər';

const renderTabImage = ({ size, color }, source) => (
  <Image
    resizeMode="contain"
    alt="tab-icon"
    size={size}
    style={{ tintColor: color }}
    source={source}
  />
);

const MainNavigator = () => {
  const { Colors, Images } = useTheme();

  const getTabIcon = ({ color, size }, routeName) => {
    switch (routeName) {
      case HOME_SCREEN:
        return renderTabImage({ size, color }, Images.home);
      case ORDERS_SCREEN:
        return renderTabImage({ size, color }, Images.orders);
      case MY_ORDERS_SCREEN:
        return renderTabImage({ size, color }, Images.basket);
      case OTHER_SCREENS:
        return renderTabImage({ size, color }, Images.dots);
        case CART_SCREEN:
          return renderTabImage({ size, color }, Images.cart);
      default:
        return null;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarInactiveTintColor: Colors.lightGray,
        tabBarLabelStyle: {
          fontSize: 9,
          fontFamily: 'Poppins',
          fontWeight: '500',
        },
        tabBarIcon: props => getTabIcon(props, route.name),
      })}>
      <Tab.Screen name={HOME_SCREEN} component={HomeNavigator} />
      <Tab.Screen name={CART_SCREEN} component={OrdersNavigator} />
      <Tab.Screen name={ORDERS_SCREEN} component={OrdersNavigator} />
      <Tab.Screen name={MY_ORDERS_SCREEN} component={MyOrdersNavigators} />
      <Tab.Screen name={OTHER_SCREENS} component={OtherNavigators} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
