import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'services';
import { API_ROUTES } from 'utils/Api';

const RESULT_KEY = 'PAY_TR';

export const payTRapi = createApi({
  reducerPath: 'payTRApi',
  tagTypes: [RESULT_KEY],
  baseQuery,
  endpoints: build => ({
    listCards: build.query({
      transformResponse: response => response.cards,
      query: () => `${API_ROUTES.payTRCards}`,
    }),
  }),
  refetchOnFocus: true,
});

export const { useListCardsQuery } = payTRapi;
