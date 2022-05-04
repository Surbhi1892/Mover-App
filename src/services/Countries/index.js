import Api, { API_ROUTES } from 'utils/Api';

export const fetchCountriesService = async () => {
  const response = await Api.get(API_ROUTES.countries);
  return response.data;
};
