import { createApi } from '@reduxjs/toolkit/query/react';
import { removeToken } from 'helpers/AsyncStorage';
import { baseQuery } from 'services';
import { API_ROUTES } from 'utils/Api';

const RESULT_KEY = 'NEWS';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  tagTypes: [RESULT_KEY],
  baseQuery,
  endpoints: build => ({
    listNews: build.query({
      transformResponse: response => response.news,
      query: ({ page }) => `${API_ROUTES.news}?page=${page}`,
    }),
    listCampaign: build.query({
      transformResponse: response => response.news,
      query: ({ page }) => `${API_ROUTES.news}?page=${page}&campaign=1`,
    }),
    singleNews: build.query({
      transformResponse: response => response.news,
      query: ({ id }) => `${API_ROUTES.news}/${id}`,
    }),
  }),
});

export const { useListNewsQuery, useLazyListNewsQuery, useSingleNewsQuery } =
  newsApi;
