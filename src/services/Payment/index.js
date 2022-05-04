import Api, { API_ROUTES } from 'utils/Api';

export const fetchCalculatePaymentOperationService = async ({
  amount,
  orders,
  bonus = true,
}) => {
  const payload = { amount, orders, bonus };
  const response = await Api.post(
    API_ROUTES.paymentCalculateOperation,
    payload
  );
  return response.data;
};

export const azericardPaymentService = async ({
  type,
  orders,
  operation,
  amount,
  round,
  courier,
  package_id,
}) => {
  const payload = {
    type,
    operation,
    amount,
    orders,
    round,
    courier,
    package_id,
  };
  const response = await Api.post(API_ROUTES.paymentPay, payload);
  return response.data;
};

export const payTRPaymentService = async ({
  type,
  orders,
  operation,
  amount,
}) => {
  const payload = {
    type,
    operation,
    amount,
    orders,
  };
  const response = await Api.post(API_ROUTES.payTRpay, payload);
  return response.data;
};
