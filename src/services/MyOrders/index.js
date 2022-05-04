import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'services';
import { API_ROUTES } from 'utils/Api';

export const orderDeliveries = [];

const resultProviding = result =>
  result
    ? // successful query
      [
        ...result.map(({ id }) => ({ type: 'MyOrders', id })),
        { type: 'MyOrders', id: 'LIST' },
      ]
    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
      [{ type: 'MyOrders', id: 'LIST' }];

export const myOrdersApi = createApi({
  reducerPath: 'myOrdersApi',
  tagTypes: ['MyOrders'],
  baseQuery,
  endpoints: build => ({
    listMyOrdersStatuses: build.query({
      transformResponse: response => response.statuses,
      query: () => `${API_ROUTES.myOrderStatuses}`,
    }),
    listMyOrdersByStatus: build.query({
      providesTags: resultProviding,
      transformResponse: response => response.data,
      query: ({ status = 1 }) => `${API_ROUTES.myOrders}?status=${status}`,
    }),
    deleteMyOrderById: build.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ id, ...patch }) => ({
        url: `${API_ROUTES.myOrders}/${id}`,
        method: 'DELETE',
        body: patch,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: response => response.data,
      invalidatesTags: (result, error, id) => [{ type: 'MyOrders', id }],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
    }),
  }),
});

export const {
  useListMyOrdersByStatusQuery,
  useDeleteMyOrderByIdMutation,
  useListMyOrdersStatusesQuery,
} = myOrdersApi;
