import Api, { API_ROUTES } from 'utils/Api';

export const newBundleOrder = async data => {
  const response = await Api.post(API_ROUTES.orders, data);
  return response.data;
};

