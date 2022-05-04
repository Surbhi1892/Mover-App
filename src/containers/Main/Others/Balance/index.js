import { useIsFocused } from '@react-navigation/native';
import { HorizontalBalanceList } from 'components';
import { BalanceItem } from 'components/HorizontalBalanceList';
import { DOLLAR_UTF, TL_UTF } from 'helpers/Constants';
import { Box, Divider, SectionList, useDisclose, VStack } from 'native-base';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectAuth } from 'store/Auth';
import AddBalanceModal from './AddBalanceModal';
import { SafeAreaView } from 'react-native-safe-area-context';

import NavigationHeader from 'components/NavigationHeader';
import NavigationBackButton from 'components/NavigationBackButton'; 


const BalanceContainer = () => {
  const { profile } = useSelector(selectAuth);
  const isFocused = useIsFocused();

  const addBalanceModalDisclose = useDisclose();

  const { balance, tl_balance: tlBalance } = profile;

  const balances = useMemo(
    () => [
      { amount: `${balance} ${DOLLAR_UTF}`, name: 'Daşınma balansım' },
      { amount: `${tlBalance} ${TL_UTF}`, name: 'Sifariş balansım' },
    ],
    [balance, tlBalance]
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocused) {
      dispatch(fetchUser());
    }
  }, [dispatch, isFocused]);

  const onPressAddBalance = useCallback(
    index => {
      addBalanceModalDisclose.onOpen();
    },
    [addBalanceModalDisclose]
  );

  const renderItem = useCallback(
    (item, index) => {
      const { name, amount } = item;
      return (
        <BalanceItem
          key={index}
          title={name}
          balance={amount}
          onPressAdd={() => onPressAddBalance(index)}
        />
      );
    },
    [onPressAddBalance]
  );

  const renderTransactionListItem = useCallback(() => null, []);

  const renderTransactionListHeader = useCallback(() => null, []);

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
          <HorizontalBalanceList data={balances} renderItem={renderItem} />
        ),
        [balances, renderItem]
      )}


      <VStack
        flex="1"
        backgroundColor="black.900"
        p="4"
        pb="0"
        borderTopLeftRadius="15px"
        borderTopRightRadius="15px">
        <SectionList
          contentContainerStyle={{ paddingTop: 30 }}
          mb="4"
          sections={[]}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={renderTransactionListItem}
          renderSectionHeader={renderTransactionListHeader}
          SectionSeparatorComponent={() => (
            <Divider height="0.5px" bgColor="gray.900" />
          )}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
      <AddBalanceModal disclose={addBalanceModalDisclose} />
    </Box>
    </SafeAreaView>

  );
};

export default BalanceContainer;
