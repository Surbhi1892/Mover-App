import {
  Box,
  Center,
  Container,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/Auth';
import React, { useLayoutEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'theme';
import {
  DashboardDetail,
  ExternalAddressesAccordion,
  HeaderNotification,
} from 'components';
import { selectDashboard } from 'store/Dashboard';
import { selectExternalAddresses } from 'store/ExternalAddresses';

const HomeContainer = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { Images } = useTheme();

  const { profile } = useSelector(selectAuth);
  const { data: dashboardData } = useSelector(selectDashboard);
  const { addresses } = useSelector(selectExternalAddresses);

  const goToNotifications = useCallback(() => {
    navigation.navigate('Notifications');
  }, [navigation]);

  const renderHeaderRight = useCallback(
    () => <HeaderNotification onPress={goToNotifications} />,
    [goToNotifications]
  );

  const goToWeightBalance = useCallback(() => {
    navigation.navigate('WeightBalance');
  }, [navigation]);

  const goToTrendyol = useCallback(() => {}, []);

  const { name, surname, doorLockCode, customerCode, balance_usd, tl_balance } =
    profile;
  const { my_orders_count, orders_count, total } = dashboardData;
  const fullName = `${name} ${surname}`;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: fullName,
      headerRight: renderHeaderRight,
    });
  }, [fullName, navigation, renderHeaderRight]);

  return (

    <Container flex={1}>
      {/* {console.log("custom",customerCode)} */}
      <Box mb={5}>
        <Text>
          {t('dashboard.customerCode')}: {customerCode}
        </Text>
        <Text>
          {t('dashboard.secretCode')}: {doorLockCode}
        </Text>
      </Box>
      <ScrollView flex={1} width="100%" pt={2}>
        <Box width="100%" mb={5}>
          {/* {console.log("order",orders_count+"  "+ my_orders_count+" "+balance_usd+ " "+tl_balance+" "+total )} */}
          <DashboardDetail
            orders={orders_count}
            myOrders={my_orders_count}
            usdBalance={balance_usd}
            tlBalance={tl_balance}
            limit={total}
          />
        </Box>
        
        <Pressable
          onPress={goToWeightBalance}
          bg="black.800"
          width="100%"
          p={4}
          borderRadius={10}>
          <Center>
            <HStack alignItems="center">
              <Image alt="weightBalance" source={Images.weightBalanceWidget} />
              <VStack ml={6}>
                <Text fontWeight="500" color="white">
                  {t('dashboard.weightWidgetTitle')}
                </Text>
                <Text color="gray.800" fontSize={10}>
                  {t('dashboard.weightWidgetDescription')}
                </Text>
              </VStack>
            </HStack>
          </Center>
        </Pressable>
        <Pressable
          onPress={goToTrendyol}
          bg="black.800"
          width="100%"
          p={4}
          mt={4}
          borderRadius={10}>
          <Center>
            <HStack alignItems="center">
              <Image alt="weightBalance" source={Images.trendyol} />
            </HStack>
          </Center>
        </Pressable>
        <ExternalAddressesAccordion addresses={addresses} />
      </ScrollView>
    </Container>
  );
};

export default HomeContainer;
