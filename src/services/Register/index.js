import Api, { API_ROUTES } from 'utils/Api';

export const registerService = async data => {
  const response = await Api.post(API_ROUTES.register, data);
  return response.data;
};

