import Api, { API_ROUTES } from 'utils/Api';


export const fetchCurrenciesService = async () => {
    const response = await Api.get(API_ROUTES.currencies);
    return response.data;
  };
  