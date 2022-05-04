import Api, { API_ROUTES } from 'utils/Api';

export const newOrderApi = async data => {
  const response = await Api.post(API_ROUTES.myOrders, data);
  return response.data;
};

