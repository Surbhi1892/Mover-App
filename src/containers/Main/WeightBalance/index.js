import {
  HorizontalBalanceList,
  SegmentControl,
  TransactionSectionListItem,
} from 'components';
import { BalanceItem } from 'components/HorizontalBalanceList';
import { useInfiniteQuery } from 'hooks/useInfiniteQuery';
import {
  Box,
  Center,
  Divider,
  HStack,
  Button,
  SectionList,
  Text,
  VStack,
} from 'native-base';
import React, { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { weightBalanceApi } from 'services/WeightBalance';
import { fetchWeightBalance, selectAuth } from 'store/Auth';
import {
  fetchWeightPackages,
  selectAllWeightPackages,
} from 'store/WeightBalance';

import moment from 'moment';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';

import NavigationHeader from 'components/NavigationHeader';
import NavigationBackButton from 'components/NavigationBackButton'; 

const DUMMY_BALANCE_DATA = [
  {
    title: 'Bu gün',
    data: [
      {
        country: {
          created_at: '2021-06-15T08:52:54.000000Z',
          full_image: 'https://flagcdn.com/32x24/tr.png',
          full_name: 'Türkiyə',
          id: 1,
          image: 'turkiye.jpg',
          iso: 'tr',
          name: 'TUR',
          status: 1,
          updated_at: '2021-07-03T11:41:53.000000Z',
        },
        country_id: 1,
        created_at: '2021-09-16 11:20:11',
        expire_at: '2021-10-16 15:20:11',
        id: 12666,
        is_expired: true,
        operation_id: 1,
        operation_name: 'mədaxil',
        package_type: { id: 2, name: 'Çəki' },
        type: 2,
        unit_name: 'Çəki',
        updated_at: '2021-09-17 09:05:04',
        used: 1,
        user_id: 2,
        value: 3,
      },
      {
        country: {
          created_at: '2021-06-15T08:52:54.000000Z',
          full_image: 'https://flagcdn.com/32x24/tr.png',
          full_name: 'Türkiyə',
          id: 1,
          image: 'turkiye.jpg',
          iso: 'tr',
          name: 'TUR',
          status: 1,
          updated_at: '2021-07-03T11:41:53.000000Z',
        },
        country_id: 1,
        created_at: '2021-07-28 07:13:03',
        expire_at: '2021-08-27 11:13:03',
        id: 3952,
        is_expired: true,
        operation_id: 1,
        operation_name: 'mədaxil',
        package_type: { id: 3, name: 'Kuryer' },
        type: 3,
        unit_name: 'Kuryer',
        updated_at: '2021-07-28 07:13:03',
        used: 1,
        user_id: 2,
        value: 2,
      },
      {
        country: {
          created_at: '2021-06-15T08:52:54.000000Z',
          full_image: 'https://flagcdn.com/32x24/tr.png',
          full_name: 'Türkiyə',
          id: 1,
          image: 'turkiye.jpg',
          iso: 'tr',
          name: 'TUR',
          status: 1,
          updated_at: '2021-07-03T11:41:53.000000Z',
        },
        country_id: 1,
        created_at: '2021-07-28 07:13:03',
        expire_at: '2021-08-27 11:13:03',
        id: 3953,
        is_expired: true,
        operation_id: 1,
        operation_name: 'mədaxil',
        package_type: { id: 4, name: 'Zəmanət' },
        type: 4,
        unit_name: 'Zəmanət',
        updated_at: '2021-07-28 07:13:03',
        used: 1,
        user_id: 2,
        value: 2,
      },
      {
        country: {
          created_at: '2021-06-15T08:52:54.000000Z',
          full_image: 'https://flagcdn.com/32x24/us.png',
          full_name: 'ABŞ',
          id: 2,
          image: 'usa.jpg',
          iso: 'us',
          name: 'USA',
          status: 1,
          updated_at: '2021-06-15T08:59:27.000000Z',
        },
        country_id: 2,
        created_at: '2021-06-02 13:31:35',
        expire_at: '2021-06-30 17:31:08',
        id: 1,
        is_expired: true,
        operation_id: 1,
        operation_name: 'mədaxil',
        package_type: { id: 2, name: 'Çəki' },
        type: 2,
        unit_name: 'Çəki',
        updated_at: null,
        used: 1,
        user_id: 2,
        value: 0.4,
      },
      {
        country: {
          created_at: '2021-06-15T08:52:54.000000Z',
          full_image: 'https://flagcdn.com/32x24/tr.png',
          full_name: 'Türkiyə',
          id: 1,
          image: 'turkiye.jpg',
          iso: 'tr',
          name: 'TUR',
          status: 1,
          updated_at: '2021-07-03T11:41:53.000000Z',
        },
        country_id: 1,
        created_at: '2021-06-02 13:31:35',
        expire_at: '2021-06-30 17:37:57',
        id: 2,
        is_expired: true,
        operation_id: 1,
        operation_name: 'mədaxil',
        package_type: { id: 2, name: 'Çəki' },
        type: 2,
        unit_name: 'Çəki',
        updated_at: null,
        used: 1,
        user_id: 2,
        value: 0.2,
      },
      {
        country: {
          created_at: '2021-06-15T08:52:54.000000Z',
          full_image: 'https://flagcdn.com/32x24/tr.png',
          full_name: 'Türkiyə',
          id: 1,
          image: 'turkiye.jpg',
          iso: 'tr',
          name: 'TUR',
          status: 1,
          updated_at: '2021-07-03T11:41:53.000000Z',
        },
        country_id: 1,
        created_at: '2021-06-02 13:31:35',
        expire_at: '2021-06-30 17:37:57',
        id: 5,
        is_expired: true,
        operation_id: 1,
        operation_name: 'mədaxil',
        package_type: { id: 2, name: 'Çəki' },
        type: 2,
        unit_name: 'Çəki',
        updated_at: null,
        used: 1,
        user_id: 2,
        value: 0.3,
      },
      {
        country: {
          created_at: '2021-06-15T08:52:54.000000Z',
          full_image: 'https://flagcdn.com/32x24/us.png',
          full_name: 'ABŞ',
          id: 2,
          image: 'usa.jpg',
          iso: 'us',
          name: 'USA',
          status: 1,
          updated_at: '2021-06-15T08:59:27.000000Z',
        },
        country_id: 2,
        created_at: '2021-06-02 13:31:35',
        expire_at: '2021-06-30 17:31:08',
        id: 6,
        is_expired: true,
        operation_id: 1,
        operation_name: 'mədaxil',
        package_type: { id: 2, name: 'Çəki' },
        type: 2,
        unit_name: 'Çəki',
        updated_at: null,
        used: 1,
        user_id: 2,
        value: 3,
      },
    ],
  },
];

const WeightBalanceContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { weightBalance } = useSelector(selectAuth);
  const weightPackages = useSelector(selectAllWeightPackages);

  const {
    data: transactions,
    isLoading,
    isFetching,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(weightBalanceApi.endpoints.listGainTransactions, {
    getNextPageParam: lastPage => {
      const nextPageUrl = lastPage.next_page_url;
      return nextPageUrl?.substr(nextPageUrl.length - 1) ?? undefined;
    },
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      Promise.all([
        dispatch(fetchWeightPackages()),
        dispatch(fetchWeightBalance()),
      ]);
    }
  }, [dispatch, isFocused]);

  const onPressAddBalance = useCallback(
    item => {
      const country = item.name;
      navigation.navigate('SelectPackage', { country });
    },
    [navigation]
  );

  const renderItem = useCallback(
    (item, index) => {
      const { full_name, package: weightPackage } = item;
      const titleText = `${full_name} Çəki ${t(
        'common.balance'
      ).toLowerCase()}`;
      const weightBalanceText = `${Number(weightPackage.weight).toFixed(2)} ${t(
        'common.kg'
      )}`;
      return (
        <BalanceItem
          key={index}
          title={titleText}
          balance={weightBalanceText}
          onPressAdd={() => onPressAddBalance(item)}
        />
      );
    },
    [onPressAddBalance, t]
  );

  const renderTransactionListItem = useCallback(
    ({ item }) => {
      const { country, created_at, value } = item;
      const title = `${country?.full_name} çəki balansı`;
      const date = moment(created_at).format('hh:mm');
      const amount = `${value} ${t('common.kg')}`;
      return (
        <TransactionSectionListItem title={title} date={date} amount={amount} />
      );
    },
    [t]
  );

  const renderTransactionListHeader = useCallback(
    ({ section: { title } }) => (
      <Box backgroundColor="black.900" py="4">
        <Text fontSize="2xs" color="gray.900">
          {title}
        </Text>
      </Box>
    ),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <NavigationHeader
      title={'Çəki'}
      headercolor={'white'}
      titleColor={'primary.900'}
      left={<NavigationBackButton color={'primary.900'} />}
    />


     
    
    <Box flex={1}>
      {useMemo(
        () => (
          <HorizontalBalanceList data={weightBalance} renderItem={renderItem} />
        ),
        [weightBalance, renderItem]
      )}
      <VStack
        flex="1"
        backgroundColor="black.900"
        p="4"
        marginTop={10}
        pb="0"
        borderTopLeftRadius="15px"
        borderTopRightRadius="15px">
        <SegmentControl tabs={['Mədaxil', 'Məxaric']} />
        <SectionList
          contentContainerStyle={{ paddingTop: 30 }}
          mb="4"
          sections={DUMMY_BALANCE_DATA}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={renderTransactionListItem}
          renderSectionHeader={renderTransactionListHeader}
          SectionSeparatorComponent={() => (
            <Divider height="0.5px" bgColor="gray.900" />
          )}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </Box>
    
    </SafeAreaView>
  );
};

export default WeightBalanceContainer;
