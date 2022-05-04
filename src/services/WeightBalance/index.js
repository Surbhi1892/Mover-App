import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'services';
import Api, { API_ROUTES } from 'utils/Api';

export const fetchWeightPackagesService = async () => {
  const response = await Api.get(API_ROUTES.weightPackages);
  return response.data;
};

const RESULT_KEY = 'WEIGHT_BALANCE';

export const weightBalanceApi = createApi({
  reducerPath: 'weightBalanceApi',
  tagTypes: [RESULT_KEY],
  baseQuery,
  endpoints: build => ({
    listGainTransactions: build.query({
      transformResponse: response => response.transactions,
      query: ({ page }) =>
        `${API_ROUTES.weightTransactions}?page=${page}&operation_id=1`,
    }),
    listSpentTransactions: build.query({
      transformResponse: response => response.transactions,
      query: ({ page }) =>
        `${API_ROUTES.weightTransactions}?page=${page}&operation_id=2`,
    }),
  }),
});

export const {} = weightBalanceApi;
