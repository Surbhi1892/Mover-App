import Api, { API_ROUTES } from 'utils/Api';

export const fetchPostOfficesService = async payload => {
  const response = await Api.get(API_ROUTES.offices, payload);
  return response.data;
};
