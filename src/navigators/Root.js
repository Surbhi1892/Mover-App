/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import * as React from 'react';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function navigateAndReset(routes = [], index = 0) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    })
  );
}

export function navigateAndSimpleReset(name, index = 0, params) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes: [{ name, params }],
    })
  );
}

/**
 *
 * @param paymentType Payment types: Order - 1, Courier - 2, Balance - 3, WeightPackage - 5
 * @param orders Orders ids array
 * @param operation Operation type
 * @param amount Payment amount
 * @param courier Courier order data
 * @param round Qəpiklərini yuvarla
 * @param packageId Weight package id
 */
export function navigateToAzericardPayment({
  paymentType,
  orders,
  operation,
  amount,
  courier,
  round,
  packageId,
  reset,
}) {
  const params = {
    paymentType,
    orders,
    operation,
    amount,
    round,
    courier,
    packageId,
  };
  navigationRef.current?.navigate('AzericardPayment', params);
}

/**
 *
 * @param paymentType Payment types: Order - 1, Courier - 2
 * @param amount amount payment
 * @param orders Orders ids array
 */
export function navigateToPayTR({ paymentType, amount, orders }) {
  const params = {
    paymentType,
    amount,
    orders,
  };
  navigationRef.current?.navigate('PayTR', {
    screen: 'PayTRCardList',
    params,
  });
}

/**
 *
 * @param paymentType Payment types: Order - 1, Courier - 2
 * @param amount amount payment
 * @param orders Orders ids array
 */
export function navigateToPayTRPayment({
  paymentType,
  amount,
  orders,
  cardData,
}) {
  const params = {
    paymentType,
    amount,
    orders,
    cardData,
  };
  navigationRef.current?.navigate('PayTR', {
    screen: 'PayTRPayment',
    params,
  });
}
