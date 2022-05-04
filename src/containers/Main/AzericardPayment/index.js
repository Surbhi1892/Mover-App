import { useRoute, useNavigation } from '@react-navigation/native';
import {
  NavigationHeader,
  PaymentError,
  PaymentLoading,
  PaymentSuccess,
} from 'components';
import NavigationBackButton from 'components/NavigationBackButton';
import { Box } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import {
  azericardPayment,
  paymentError,
  paymentSuccess,
  resetPayment,
  selectAzericardPayment,
} from 'store/AzericardPayment';

export const PAYMENT_TYPES = {
  order: 1,
  courier: 2,
  balance: 3,
  weightPackage: 5,
};

const AzericardPaymentContainer = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { hasError, errorMessage, isLoading, azericardData, isPaymentSuccess } =
    useSelector(selectAzericardPayment);

  const paymentType = params?.paymentType;
  const orders = params?.orders;
  const round = params?.round;
  const operation = params?.operation;
  const amount = params?.amount;
  const packageId = params?.packageId;

  const initPayment = useCallback(() => {
    dispatch(
      azericardPayment({
        type: paymentType,
        orders,
        operation,
        amount,
        round,
        package_id: packageId,
      })
    );
  }, [amount, dispatch, operation, orders, packageId, paymentType, round]);

  useEffect(() => {
    initPayment();
    return () => {
      dispatch(resetPayment());
    };
  }, [initPayment, dispatch]);

  const onNavigationStateChange = useCallback(
    state => {
      if (state.url.indexOf(`?success=true`) !== -1) {
        dispatch(paymentSuccess());
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else if (state.url.indexOf(`?success=false`) !== -1) {
        dispatch(
          paymentError(
            'Ödəniş zamanı xəta baş verdi. Zəhmət olmasa biraz sonra yenidən cəhd edin'
          )
        );
      }
    },
    [dispatch, navigation]
  );

  const renderLoading = useCallback(() => <PaymentLoading />, []);

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

    const uri = `${azericardData.url}?${azericardData.stringifiedParams}`;

    return (
      <WebView
        source={{ uri }}
        javaScriptEnabled
        domStorageEnabled
        javaScriptCanOpenWindowsAutomatically={false}
        mediaPlaybackRequiresUserAction={false}
        renderLoading={renderLoading}
        startInLoadingState
        onNavigationStateChange={onNavigationStateChange}
      />
    );
  }, [
    isLoading,
    hasError,
    isPaymentSuccess,
    azericardData.url,
    azericardData.stringifiedParams,
    onNavigationStateChange,
    renderLoading,
    errorMessage,
    initPayment,
  ]);

  return (
    <Box flex="1">
      <NavigationHeader
        title={t('azericardPayment.name')}
        titleColor={"white"}
        headercolor={"primary.900"}
        left={<NavigationBackButton color ={"white"}/>}
      />
      {renderContent()}
    </Box>
  );
};

export default AzericardPaymentContainer;
