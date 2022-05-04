import Api, { API_ROUTES } from 'utils/Api';

export const fetchDashboardDataService = async () => {
  const response = await Api.get(API_ROUTES.dashboardData);
  return response.data;
};
