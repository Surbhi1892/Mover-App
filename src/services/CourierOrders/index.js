import Api, { API_ROUTES } from 'utils/Api';

export const fetchCourierOrdersService = async () => {
  const response = await Api.get(API_ROUTES.courierRequests);
  return response.data;
};

export const fetchDeliverableCourierOrdersService = async () => {
  const response = await Api.get(API_ROUTES.courierOrders);
  return response.data;
};
