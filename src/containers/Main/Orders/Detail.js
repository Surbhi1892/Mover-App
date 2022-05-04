import { Box, useDisclose, VStack,ScrollView, } from 'native-base';
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleOrder, selectSingleOrder } from 'store/Orders/Single';
import { useRoute } from '@react-navigation/native';
import DetailHeader from './components/DetailHeader';
import DetailContent from './components/DetailContent';
import { OrderPaymentModal } from 'components';
import { useIsFocused } from '@react-navigation/native';

const OrderDetailContainer = ({ navigation }) => {
  const { params } = useRoute();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const orderId = params?.id;

  const { isLoading, order } = useSelector(selectSingleOrder);

  const paymentModalDisclose = useDisclose();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${t('common.bundle')} #${orderId}`,
    });
  }, [navigation, orderId, t]);

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchSingleOrder({ id: orderId }));
    }
  }, [dispatch, orderId, isFocused]);

  const onPressPay = useCallback(() => {
    paymentModalDisclose.onOpen();
  }, [paymentModalDisclose]);

  // if (isLoading) {
  //   return null;
  // }

  return (
    <ScrollView  
    flex={1}
      >
    <Box backgroundColor="black.900" >
      <VStack flex={1}>
        <DetailHeader order={order} onPressPay={onPressPay} />
        <DetailContent order={order} />
      </VStack>
      <OrderPaymentModal orders={[order]} {...paymentModalDisclose} />
    </Box>
    </ScrollView>
  );
};

export default OrderDetailContainer;
