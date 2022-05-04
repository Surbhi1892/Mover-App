import { useRoute, useNavigation } from '@react-navigation/native';
import { DOLLAR_UTF } from 'helpers/Constants';
import {
  Box,
  Button,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { navigateToAzericardPayment } from 'navigators/Root';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  selectAllWeightPackages,
  selectWeightPackagesByCountry,
} from 'store/WeightBalance';
import { PAYMENT_TYPES } from '../AzericardPayment';

const SelectPackageContainer = () => {
  const { params } = useRoute();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const country = params.country;
  const weightPackages = useSelector(state =>
    selectWeightPackagesByCountry(state, country)
  );

  const packages = useMemo(
    () => weightPackages.packages || [],
    [weightPackages]
  );

  const onPressBuyPackage = useCallback(
    packageItem => {
      navigation.goBack();
      setTimeout(() => {
        navigateToAzericardPayment({
          paymentType: PAYMENT_TYPES.weightPackage,
          packageId: packageItem.id,
          reset: true,
        });
      }, 0);
    },
    [navigation]
  );

  const renderPackageItem = useCallback(
    (item, index) => {
      const { id, value, specific, price, real_price } = item;
      const isSpecific = specific === 1;
      return (
        <Box
          key={id}
          borderRadius={20}
          borderWidth="10"
          borderColor="white"
          backgroundColor="black.900"
          width="1/2">

          <VStack flex="1">
            <Center p="4" flex="1">
              <Text color="white" fontSize="xl" fontWeight="bold">
                {value} {t('common.kg')}
              </Text>
              {isSpecific && <Text color="white">Sənə özəl</Text>}
            </Center>
            <Button 
               borderBottomLeftRadius={10}
               borderBottomRightRadius={10}
              onPress={() => onPressBuyPackage(item)}>
              <HStack space="2">
                <Text color="white" fontSize="md">
                  Al
                </Text>
                <Text color="white" fontSize="md" fontWeight="bold">
                  {price} {DOLLAR_UTF}
                </Text>
                <Text
                  fontSize="xs"
                  color="white"
                  textDecorationLine="line-through">
                  {real_price} {DOLLAR_UTF}
                </Text>
              </HStack>
            </Button>
          </VStack>
        </Box>
      );
    },
    [onPressBuyPackage, t]
  );

  return (

    <Box flex="1" p="4">
      <Text mx="2" fontSize="xs" textAlign="center" mb="2">
        {t('weightBalance.infoText')}
      </Text>
      
      <ScrollView flex="1">
        <Box flexWrap="wrap" flexDir="row">
          {packages.map(renderPackageItem)}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SelectPackageContainer;
