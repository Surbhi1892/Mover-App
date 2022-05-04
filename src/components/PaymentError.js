import { useNavigation } from '@react-navigation/native';
import { Button, Center, Heading, HStack, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentSuccess = ({ errorMessage, onRetry }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <Center flex="1" p="4">
      <Heading color="primary.900" fontSize="lg">
        {t('common.errorPayment')}
      </Heading>
      <Text mt={2}>{errorMessage}</Text>
      <HStack mt={10} space={2}>
        <Button onPress={onRetry}>{t('common.retry')}</Button>
         <Button onPress={navigation.goBack} variant="ghost">
          {t('common.goBack')}
        </Button>
      </HStack>
    </Center>
  );
};

export default PaymentSuccess;
