import { Box, Button, HStack, Text, VStack } from 'native-base';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const SUCCESS_COLOR = 'green.100';
const DEFAULT_COLOR = 'white';

const DetailHeader = ({ order, onPressPay }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {
    specificationName,
    shopName,
    id,
    ins,
    paid,
    weight,
    shippingPrice,
    shippingPriceAzn,
  } = order;
  const mrvrmTracking = `MVRM346${id}`;

  const hasInsurance = ins === 1;
  const isPaid = paid === '1';
  const insuranceText = hasInsurance
    ? t('orderDetail.insurance')
    : t('orderDetail.noInsurance');
  const insuranceColor = hasInsurance ? SUCCESS_COLOR : DEFAULT_COLOR;

  const paidColor = isPaid ? SUCCESS_COLOR : 'white';
  const payButtonVariant = isPaid ? 'ghost' : 'solid';

  const weightText = `${Number(weight).toFixed(3)} ${t('common.kg')}`;
  const shippingText = `$${Number(shippingPrice).toFixed(2)} (${Number(
    shippingPriceAzn
  ).toFixed(2)} AZN)`;
  const paidText = isPaid ? t('common.paid') : t('common.pay');

  return (
    <VStack>
      <HStack p={6} justifyContent="space-between" alignItems="center">
        <VStack>
          <Text color="white" fontSize="xs">
            {specificationName}
          </Text>
          <Text fontSize="xl" color="white" fontWeight="600">
            {shopName}
          </Text>
          <Text fontSize="xs" color="white">
            {t('common.tracking')}:{' '}
            <Text fontWeight="500" color="white">
              {mrvrmTracking}
            </Text>
          </Text>
        </VStack>
        <Text color={insuranceColor} fontSize="xs">
          {insuranceText}
        </Text>
      </HStack>
      <HStack px={6} pb={6}>
        <VStack flex={1}>
          <Text fontSize="xs" color="gray.100">
            {t('common.weight')}
          </Text>
          <Text lineHeight="24px" mt={1} fontSize="sm" color="white">
            {weightText}
          </Text>
        </VStack>
        <VStack flex={1.3}>
          <Text fontSize="xs" color="gray.100">
            {t('common.delivery')}
          </Text>
          <Text lineHeight="24px" mt={1} fontSize="sm" color="white">
            {shippingText}
          </Text>
        </VStack>
        <Box flex={0.8} justifyContent="flex-end" alignItems="flex-end">
          <Button variant={payButtonVariant} onPress={onPressPay}>
            <Text numberOfLines={1} fontSize="xs" color={paidColor}>
              {paidText}
            </Text>
          </Button>
        </Box>
      </HStack>
    </VStack>
  );
};

export default DetailHeader;
