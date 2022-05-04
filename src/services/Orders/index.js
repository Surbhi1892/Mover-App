import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'services';
import Api, { API_ROUTES } from 'utils/Api';

export const fetchOrdersDeliveriesService = async () => {
  const response = await Api.get(API_ROUTES.deliveries);
  return response.data;
};

export const fetchOrdersService = async params => {
  const response = await Api.get(
    `${API_ROUTES.orders}?page=${params.page}&delivery=${params.delivery}`
  );
  return response.data;
};

export const fetchSingleOrderService = async id => {
  const response = await Api.get(`${API_ROUTES.orders}/${id}`);
  return response.data;
};

export const fetchReturnReasonsService = async () => {
  const response = await Api.get(API_ROUTES.returnReasonStatus);
  return response.data;
};

export const buyInsuranceToOrderService = async id => {
  const payload = { order_id: id };
  const response = await Api.post(API_ROUTES.addInsurance, payload);
  return response.data;
};

export const orderIsNotMineService = async id => {
  const response = await Api.get(`${API_ROUTES.addMissingOrder}/${id}`);
  return response.data;
};

export const orderReturnToSellerService = async payload => {
  const response = await Api.post(API_ROUTES.addReturnOrder, payload);
  return response.data;
};

export const newBundleService = async payload =>{
  const response = await Api.post(API_ROUTES.orders,payload)
  return response.data
}


export const fetchProductTypesService = async countryId => {
  const response = await Api.get(`${API_ROUTES.types}/${countryId}`);
  console.log("fetchProductTypesService",JSON.stringify(response.data))

  return response.data;
};

export const fetchCurrencies = async() => {
  const response = await Api.get(API_ROUTES.currencies);
  // console.log("curr",JSON.stringify(response.data))

  return response.data;

};



const RESULT_KEY = 'PRODUCT_CODES';

export const productCodesApi = createApi({
  reducerPath: 'productCodesApi',
  tagTypes: [RESULT_KEY],
  baseQuery,
  endpoints: build => ({
    listProductCodes: build.query({
      transformResponse: response => response.types,
      query: ({ countryId }) => `${API_ROUTES.types}/${countryId}`,
    }),
  }),
});

export const { useListProductCodesQuery } = productCodesApi;
