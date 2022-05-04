import { useRoute, useNavigation } from '@react-navigation/native';
import { PaymentError, PaymentLoading, PaymentSuccess } from 'components';
import { Box, Button, Center, CheckIcon, Heading, Text } from 'native-base';
import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/Auth';
import {
  paymentError,
  paymentSuccess,
  payTRPayment,
  resetPayment,
  selectPayTRPayment,
} from 'store/PayTRPayment';
import { PAY_TR_OPERATIONS, PAY_TR_PAYMENT_TYPES } from './index';
import queryString from 'query-string';

const PayTRPaymentContainer = () => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const navigation = useNavigation();

  const { profile } = useSelector(selectAuth);
  const { isLoading, payTRData, hasError, isPaymentSuccess, errorMessage } =
    useSelector(selectPayTRPayment);

  const paymentType = params?.paymentType;
  const amount = params?.amount;
  const orders = params?.orders;
  const cardData = params?.cardData;

  const getTotalOrdersAmount = useCallback(
    () =>
      orders
        .map(order => {
          const price = parseFloat(order.price);
          const ourPrice = price * 1.05 * order.count;
          return ourPrice;
        })
        .reduce(
          (previousValue, currentValue) => (previousValue += currentValue)
        ),
    [orders]
  );

  const getOrderIds = useCallback(
    () => orders.map(order => order.id),
    [orders]
  );

  const getPaymentOperation = useCallback(() => {
    let operation;
    const balance = parseFloat(profile?.tl_balance);
    const totalAmount = getTotalOrdersAmount();
    if (balance <= 0) {
      operation = PAY_TR_OPERATIONS.onlyCard;
    } else if (balance > 0 && balance < totalAmount) {
      operation = PAY_TR_OPERATIONS.balanceWithCard;
    } else {
      operation = PAY_TR_OPERATIONS.onlyBalance;
    }
    return operation;
  }, [getTotalOrdersAmount, profile?.tl_balance]);

  const createPaymentPayload = useCallback(() => {
    const payload = {
      type: paymentType,
    };
    if (paymentType === PAY_TR_PAYMENT_TYPES.balance) {
      payload.amount = amount;
    } else if (paymentType === PAY_TR_PAYMENT_TYPES.order) {
      payload.operation = getPaymentOperation();
      payload.amount = getTotalOrdersAmount();
      payload.orders = getOrderIds();
    }
    return payload;
  }, [
    amount,
    getOrderIds,
    getPaymentOperation,
    getTotalOrdersAmount,
    paymentType,
  ]);

  const initPayment = useCallback(() => {
    const payload = createPaymentPayload();
    dispatch(payTRPayment(payload));
  }, [createPaymentPayload, dispatch]);

  useEffect(() => {
    initPayment();
    return () => {
      dispatch(resetPayment());
    };
  }, [initPayment, dispatch]);

  const renderLoading = useCallback(() => <PaymentLoading />, []);

  const body = useMemo(
    () => `${payTRData.stringifiedParams}&${queryString.stringify(cardData)}`,
    [cardData, payTRData.stringifiedParams]
  );

  const onNavigationStateChange = useCallback(
    state => {
      if (state.url.indexOf(`?success=true`) !== -1) {
        dispatch(paymentSuccess());
      } else if (state.url.indexOf(`?success=false`) !== -1) {
        dispatch(
          paymentError(
            'Ödəniş zamanı xəta baş verdi. Zəhmət olmasa biraz sonra yenidən cəhd edin'
          )
        );
      }
    },
    [dispatch]
  );

  const renderContent = useCallback(() => {
    if (isLoading) {
      return renderLoading('Ödəniş məlumatları yoxlanılır');
    }
    if (hasError) {
      return <PaymentError errorMessage={errorMessage} onRetry={initPayment} />;
    }

    if (isPaymentSuccess) {
      return <PaymentSuccess />;
    }
    return (
      <WebView
        source={{
          uri: payTRData.url,
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }}
        javaScriptEnabled
        domStorageEnabled
        javaScriptCanOpenWindowsAutomatically={false}
        mediaPlaybackRequiresUserAction={false}
        renderLoading={renderLoading}
        startInLoadingState
        onNavigationStateChange={onNavigationStateChange}
        scalesPageToFit={false}
        style={styles.webView}
      />
    );
  }, [
    body,
    errorMessage,
    hasError,
    initPayment,
    isLoading,
    isPaymentSuccess,
    onNavigationStateChange,
    payTRData.url,
    renderLoading,
  ]);

  return <Box flex="1">{renderContent()}</Box>;
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});

export default PayTRPaymentContainer;
