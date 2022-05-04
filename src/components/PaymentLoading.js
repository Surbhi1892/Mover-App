import { Center, Heading, HStack, Spinner } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentLoading = ({ title }) => {
  const { t } = useTranslation();
  return (
    <Center
      flex="1"
      backgroundColor="white"
      position="absolute"
      width="100%"
      height="100%">
      <HStack space={2}>
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          {t('common.loadingPaymentPage')}
        </Heading>
      </HStack>
    </Center>
  );
};

export default PaymentLoading;
