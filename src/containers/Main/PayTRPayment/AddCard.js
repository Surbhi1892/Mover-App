import { useRoute } from '@react-navigation/native';
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Input,
  Text,
  VStack,
} from 'native-base';
import { navigateToPayTRPayment } from 'navigators/Root';
import React, { useCallback } from 'react';

const AddCardContainer = () => {
  const { params } = useRoute();
  //Container Params
  const paymentType = params?.paymentType;
  const amount = params?.amount;
  const orders = params?.orders;

  const onPressAddCard = useCallback(() => {
    const storeCard = true;
    const cardData = {
      cc_owner: 'PAYTR TEST',
      card_number: '4355084355084358',
      expiry_month: '12',
      expiry_year: '24',
      cvv: '000',
      store_card: storeCard ? '1' : '0',
    };
    navigateToPayTRPayment({ paymentType, amount, orders, cardData });
  }, [amount, orders, paymentType]);

  return (
    <Box flex="1" safeAreaBottom p="4">
      <Box flex="1">
        <Box backgroundColor="black.900" p="4" borderRadius="8px" shadow="3">
          <VStack>
            <Text fontSize="2xs" color="white" alignSelf="flex-end">
              CREDIT / DEBIT
            </Text>
            <Input
              autoCompleteType="cc-number"
              mt="60px"
              placeholder="Card number"
              borderRadius="4px"
            />
            <HStack space="4" mt="2">
              <Input
                autoCompleteType="cc-exp"
                flex="1"
                placeholder="Expiration date"
                borderRadius="4px"
              />
              <Input
                autoCompleteType="cc-csc"
                flex="1"
                placeholder="000"
                borderRadius="4px"
              />
            </HStack>
          </VStack>
        </Box>
        <Checkbox mt="3">Save card</Checkbox>
      </Box>
      <Button size="lg" onPress={onPressAddCard}>
        Scan card
      </Button>
    </Box>
  );
};

export default AddCardContainer;
