import Api, { API_ROUTES } from 'utils/Api';

export const signInService = async data => {
  const response = await Api.post(API_ROUTES.login, data);
  return response.data;
};

export const fetchUserService = async () => {
  const response = await Api.get(API_ROUTES.me);
  return response.data;
};

export const fetchWeightBalanceService = async () => {
  const response = await Api.get(API_ROUTES.weightBalance);
  return response.data;
};
