import { useNavigation } from '@react-navigation/native';
import { Box, Button, Center, CheckIcon, Heading } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentSuccess = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <Center flex="1" p="4">
      <Box
        borderWidth="2"
        borderRadius="35"
        padding="4"
        borderColor="primary.100">
        <CheckIcon color="primary.100" />
      </Box>
      <Heading my="4" color="primary.900" fontSize="lg">
        {t('common.successPayment')}
      </Heading>
      <Button onPress={() => navigation.navigate('Main')}>
        {t('common.goBack')}
      </Button>
    </Center>
  );
};

export default PaymentSuccess;
