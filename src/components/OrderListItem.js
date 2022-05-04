import { Box, Button, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import OrderItemDeliverySteps from './OrderItemDeliverySteps';

const OrderListItem = ({ order, onPressDetail }) => {
  // console.log("order list ",JSON.stringify(order))
  const { t } = useTranslation();
  const {
    shopName,
    specificationName,
    id,
    country,
    statusName,
    delivery,
    price,
    _currency,
    weight,
    shippingPrice,
  } = order;
  const { full_name: countryFullName } = country;

  const mrvrmTracking = `MVRM346${id}`;
  const fromCountry = countryFullName;
  const toCountry = 'Bakı';
  return (
    <Box borderRadius={10} px={5} py={4} backgroundColor="black.800">
      <VStack>
        <HStack justifyContent="space-between">
          <Text fontSize="lg" lineHeight="24px" fontWeight="500" color="white">
            {shopName}
          </Text>
          <Text fontSize="xs" lineHeight="24px" fontWeight="300" color="white">
            {specificationName}
          </Text>
        </HStack>
        <Text color="white" fontSize="xs" lineHeight="18px" fontWeight="300">
          Tracking:{' '}
          <Text color="white" fontSize="xs" lineHeight="18px" fontWeight="500">
            {mrvrmTracking}
          </Text>
        </Text>
        <OrderItemDeliverySteps
          fromCountry={fromCountry}
          toCountry={toCountry}
          statusName={statusName}
          delivery={delivery}
        />
        <HStack pt={4} justifyContent="space-between">
          <VStack>
            <Text color="white" fontSize="xs">
              {t('common.price')}
            </Text>
            <Text fontSize="sm" color="white">
              {price} {_currency.code}
            </Text>
          </VStack>
          <VStack>
            <Text color="white" fontSize="xs">
              {t('common.weightAndShipping')}
            </Text>
            <Text fontSize="sm" color="white">
              {weight} {t('common.kg')} = ${shippingPrice}
            </Text>
          </VStack>
          <Button
            onPress={onPressDetail}
            colorScheme="secondary"
            variant="outline"
            size="xs">
            {t('common.details')}
          </Button>
        </HStack>
      </VStack>
    </Box>



  );
};

export default OrderListItem;
