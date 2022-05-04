import { Box, Button, HStack, Text, View } from 'native-base';
import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ActionVerticalStepIndicator } from 'components';
import moment from 'moment';



const ActionsTab =  ({ order }) => {
  console.log("tab order",JSON.stringify(order))
  const { t } = useTranslation();
  const navigation = useNavigation();

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

   
  return (
    <ActionVerticalStepIndicator  steps={order} delivery={delivery}  />
  );
};

export default ActionsTab;
