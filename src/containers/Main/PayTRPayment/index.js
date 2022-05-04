import { useNavigation } from '@react-navigation/native';
import CardListItem from 'components/CardListItem';
import { Box, Button, FlatList, Text } from 'native-base';
import React, { useCallback } from 'react';
import { useListCardsQuery } from 'services/Payment/PayTR';
import { useRoute } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { navigateToPayTRPayment } from 'navigators/Root';

export const PAY_TR_PAYMENT_TYPES = {
  balance: 1,
  order: 2,
};

export const PAY_TR_OPERATIONS = {
  onlyBalance: 1,
  balanceWithCard: 2,
  onlyCard: 3,
};

const PayTRPaymentContainer = () => {
  const { params } = useRoute();

  //Container Params
  const paymentType = params?.paymentType;
  const amount = params?.amount;
  const orders = params?.orders;

  const navigation = useNavigation();
  const { isLoading, data: cards, refetch, isFetching } = useListCardsQuery();

  const onPressCardItem = useCallback(
    item => {
      navigateToPayTRPayment({ paymentType, amount, orders, cardData: item });
    },
    [amount, orders, paymentType]
  );

  const renderItem = useCallback(
    ({ item }) => {
      const { last_4, month, year, c_name } = item;
      const cardNumber = `**** **** **** ${last_4}`;
      const expireDate = `${month}/${year}`;
      return (
        <CardListItem
          onPress={() => onPressCardItem(item)}
          expireDate={expireDate}
          holderName={c_name}
          cardNumber={cardNumber}
        />
      );
    },
    [onPressCardItem]
  );

  const keyExtractor = useCallback(item => String(item.ctoken), []);

  const goToAddCard = useCallback(() => {
    navigation.navigate('PayTRAddCard', { paymentType, amount, orders });
  }, [amount, navigation, orders, paymentType]);

  return (
    <Box flex="1" safeAreaBottom>
      <Text m="4" fontSize="lg" fontWeight="bold">
        Kredit və debit kartlar
      </Text>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={cards}
      />
      <Button m="4" size="lg" onPress={goToAddCard}>
        Yeni kart ilə ödəniş et
      </Button>
    </Box>
  );
};

export default PayTRPaymentContainer;
