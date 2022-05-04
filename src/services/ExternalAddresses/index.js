import Api, { API_ROUTES } from 'utils/Api';

export const fetchExternalAddressesService = async () => {
  const response = await Api.get(API_ROUTES.addresses);
  return response.data;
};
