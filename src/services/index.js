import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

export const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
