import Api, { API_ROUTES } from 'utils/Api';

export const fetchNotificationsService = async ({ page }) => {
  const response = await Api.get(`${API_ROUTES.notifications}?page=${page}`);
  return response.data;
};
