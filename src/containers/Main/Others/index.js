import Intercom from '@intercom/intercom-react-native';
import { useNavigation,StackActions ,CommonActions} from '@react-navigation/native';
import { HeaderNotification } from 'components';
import { removeToken } from 'helpers/AsyncStorage';
import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import {Alert } from 'react-native'
import React, { useContext,useCallback, useLayoutEffect, useMemo } from 'react';
import {
  getCustomsToken,
  removeCustomsRefreshToken,
  removeCustomsToken,
} from 'helpers/AsyncStorage';
import CookieManager from '@react-native-community/cookies';
import AsyncStorage from '@react-native-community/async-storage';
import firebase, { messaging } from 'react-native-firebase';
import { identify, track } from 'helpers/analytics';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/Auth';
import { useTheme } from 'theme';
import AuthContext from 'contexts/AuthContext';

const ScreenItem = ({ title, icon, onPress }) => (
  <Pressable width="1/3" mb={6} height="100px" onPress={onPress}>
    <Center>
      <Image alt={title} source={icon} />
      <Text fontSize="xs" fontWeight="500" mt={4} textAlign="center" maxW={100}>
        {title}
      </Text>
    </Center>
  </Pressable>
);

const OthersContainer = () => {
  const { Images } = useTheme();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { profile } = useSelector(selectAuth);
  const { signOut } = useContext(AuthContext);

  const { name, surname, customerCode, doorLockCode } = profile;
  const fullName = `${name} ${surname}`;

  const onPressCustomerSupport = useCallback(() => {
    Intercom.displayMessenger();
  }, []);

  const screens = useMemo(
    () => [
      {
        title: t('externalAddresses.name'),
        icon: Images.globous,
        screenName: 'ExternalAddresses',
      },
      {
        title: t('orders.name'),
        icon: Images.box,
        screenName: 'Orders',
      },
      {
        title: t('myOrders.name'),
        icon: Images.searchBox,
        screenName: 'MyOrders',
      },
      {
        title: t('profile.name'),
        icon: Images.man,
        screenName: 'Profile',
      },
      {
        title: t('courierOrder.name'),
        icon: Images.courier,
        screenName: 'CourierOrders',
      },
      {
        title: t('balance.name'),
        icon: Images.barcode,
        screenName: 'Balance',
      },
      {
        title: t('customerSupport.name'),
        icon: Images.tasks,
        screenName: 'InquiryContainer',
      },
      {
        title: t('news.name'),
        icon: Images.news,
        screenName: 'News',
      },
      {
        title: t('shippingTerms.name'),
        icon: Images.terms,
        screenName: 'TermsOfShipping',
      },
      {
        title: t('common.signout'),
        icon: Images.logout,
        screenName: 'signout',
      },
      
    ],
    [
      Images.barcode,
      Images.box,
      Images.courier,
      Images.globous,
      Images.man,
      Images.news,
      Images.searchBox,
      Images.tasks,
      Images.terms,
      Images.logout,
      onPressCustomerSupport,
      t,
    ]
  );

  const goToNotifications = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);
  const renderHeaderRight = useCallback(
    () => <HeaderNotification onPress={goToNotifications} />,
    [goToNotifications]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: fullName,
      headerRight: renderHeaderRight,
    });
  }, [fullName, navigation, renderHeaderRight]);

  const onPressSignOut = () => {
    Alert.alert(
      t('Diqqət'),
      t('Çıxış etmək istədiyinizdən əminsiniz?'),
      [
        {
          text: t('BƏLİ'),
          onPress:async  () => {
            try {
              await Intercom.logout();
              await AsyncStorage.clear();
              await firebase.messaging().deleteToken();

              navigation.dispatch(
                StackActions.popToTop()
                );
          

            } catch (error) {
              alert(JSON.stringify(error));
            } 
        },
        },
        {text: t('XEYR'), style: 'cancel'},
      ],
      {
        cancelable: false,
      },
    );
};



  const onPressScreenItem = useCallback(
    index => {
      const { screenName, onPress } = screens[index];
      if (screenName === 'signout') {
        requestAnimationFrame(() => {
          onPressSignOut();
        });
        return;
      }

      if (screenName) {
        navigation.navigate(screenName);
        return;
      }
      if (onPress) {
        onPress();
      }
    },
    [navigation, screens]
  );

  return (
    <Container flex={1}>
      <Box mb={5}>
        <Text>
          {t('dashboard.customerCode')}: {customerCode}
        </Text>
        <Text>
          {t('dashboard.secretCode')}: {doorLockCode}
        </Text>
      </Box>
      <ScrollView>
        <HStack flexWrap="wrap">
          {screens.map(({ title, icon }, index) => (
            <ScreenItem
              key={index}
              title={title}
              icon={icon}
              onPress={() => onPressScreenItem(index)}
            />
          ))}
        </HStack>
      </ScrollView>

    </Container>
  );
};

export default OthersContainer;
