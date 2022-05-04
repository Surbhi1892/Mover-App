import { useNavigation } from '@react-navigation/native';
import { Error } from 'components';
import { PAYMENT_TYPES } from 'containers/Main/AzericardPayment';
import { DOLLAR_UTF, MANAT_UTF } from 'helpers/Constants';
import { safeAwait } from 'helpers/safeAwait';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Modal,
  Spinner,
  Text,
} from 'native-base';
import { navigateToAzericardPayment } from 'navigators/Root';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { fetchCalculatePaymentOperationService } from 'services/Payment';
import { selectAuth } from 'store/Auth';

const OrderPaymentModal = ({ orders, isOpen, onOpen, onClose }) => {
  const { t } = useTranslation();
  const { profile } = useSelector(selectAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);

  const getOrdersTotalAmount = useCallback(
    () =>
      orders.length > 0
        ? orders
            .map(order => order.shippingPrice)
            .reduce(
              (prevAmount, currentAmount) => (prevAmount += currentAmount)
            )
        : 0,
    [orders]
  );

  const getOrderIds = useCallback(
    () => orders.map(order => String(order.id)),
    [orders]
  );

  const fetchCalculatePaymentOperation = useCallback(async () => {
    const totalOrdersAmount = getOrdersTotalAmount();
    const orderIds = getOrderIds();
    const bonus = true;

    setIsLoading(true);
    setError(null);

    const [paymentDetailError, newPaymentDetails] = await safeAwait(
      fetchCalculatePaymentOperationService({
        amount: totalOrdersAmount,
        orders: orderIds,
        bonus,
      }),
      () => setIsLoading(false)
    );

    if (paymentDetailError) {
      setError(paymentDetailError);
      return;
    }

    setPaymentDetails(newPaymentDetails);
  }, [getOrderIds, getOrdersTotalAmount]);

  useLayoutEffect(() => {
    if (isOpen) {
      fetchCalculatePaymentOperation();
    }
  }, [fetchCalculatePaymentOperation, isOpen]);

  const onPressPay = useCallback(() => {
    onClose();
    const { amount, operation } = paymentDetails;
    const orderIds = getOrderIds();
    navigateToAzericardPayment({
      paymentType: PAYMENT_TYPES.order,
      amount,
      operation,
      orders: orderIds,
    });
  }, [paymentDetails, getOrderIds, onClose]);

  const renderTableRow = useCallback(({ title, data1, data2 }) => {
    return (
      <HStack px="2" my="2" justifyContent="space-between">
        <Box flex="1">
          <Text color="black">{title}</Text>
        </Box>
        <Box flex="1" alignItems="flex-end">
          <Text color="black">{data1}</Text>
        </Box>
        <Box flex="1" alignItems="flex-end">
          <Text color="black">{data2}</Text>
        </Box>
      </HStack>
    );
  }, []);

  const renderContent = useCallback(() => {
    if (isLoading) {
      return (
        <HStack
          space={2}
          height="100px"
          alignItems="center"
          justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {t('orderPaymentModal.loading')}
          </Heading>
        </HStack>
      );
    }

    if (error) {
      return (
        <Box mt={2}>
          <Error
            color="black"
            error={error}
            onRetry={fetchCalculatePaymentOperation}
          />
        </Box>
      );
    }

    if (!paymentDetails) {
      return null;
    }

    const { balance, bonusBalanceUsd } = profile;
    const { amount } = paymentDetails;

    return (
      <>
        <Modal.Header>
          <Text fontSize="lg">Ödəniş məlumatları</Text>
          <Text fontSize="xs">{t('orderPaymentModal.title')}</Text>
        </Modal.Header>
        <Modal.Body padding={0} my={4}>
          <HStack px="2" my="2" justifyContent="space-between">
            <Box flex="1">
              <Text color="gray.900">Tip</Text>
            </Box>
            <Box flex="1" alignItems="flex-end">
              <Text color="gray.900">Hazırda</Text>
            </Box>
            <Box flex="1" alignItems="flex-end">
              <Text color="gray.900">Çıxılacaq</Text>
            </Box>
          </HStack>
          <Divider />
          {renderTableRow({
            title: 'Balans',
            data1: `${Number(balance).toFixed(2)} ${MANAT_UTF}`,
            data2: `${Number(amount.balance).toFixed(2)} ${MANAT_UTF}`,
          })}
          {renderTableRow({
            title: 'Bonus',
            data1: `${Number(bonusBalanceUsd).toFixed(2)} ${DOLLAR_UTF}`,
            data2: `${Number(amount.bonus).toFixed(2)} ${DOLLAR_UTF}`,
          })}
          {renderTableRow({
            title: 'Kartdan',
            data1: '-',
            data2: `${Number(amount.card).toFixed(2)} ${MANAT_UTF}`,
          })}
          {renderTableRow({
            title: 'Çəki',
            data1: `${Number(NaN).toFixed(2)} ${t('common.kg')}`,
            data2: `${Number(amount.weight).toFixed(2)} ${t('common.kg')}`,
          })}
        </Modal.Body>
        <Button.Group alignSelf="flex-end">
          <Button size="md" onPress={onPressPay}>
            {t('common.pay')}
          </Button>
          <Button size="md" variant="ghost" onPress={onClose}>
            {t('common.cancel')}
          </Button>
        </Button.Group>
      </>
    );
  }, [
    error,
    fetchCalculatePaymentOperation,
    isLoading,
    onClose,
    onPressPay,
    paymentDetails,
    profile,
    renderTableRow,
    t,
  ]);

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}>
      <Modal.Content
        borderRadius={10}
        backgroundColor="white"
        maxWidth="400px"
        p={5}>
        {renderContent()}
      </Modal.Content>
    </Modal>
  );
};

export default OrderPaymentModal;
