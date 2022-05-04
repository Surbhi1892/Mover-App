import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchExternalAddressesService } from 'services/ExternalAddresses';

export const fetchExternalAddresses = createAsyncThunk(
  'externalAddresses/list',
  async (params, thunkAPI) => {
    const response = await fetchExternalAddressesService();
    return response;
  },
);

const externalAddressesSlice = createSlice({
  name: 'externalAddresses',
  initialState: {
    addresses: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchExternalAddresses.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchExternalAddresses.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.addresses = payload.addresses;
    });
    builder.addCase(fetchExternalAddresses.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = externalAddressesSlice.actions;

export const selectExternalAddresses = state => state.externalAddresses;

export default externalAddressesSlice.reducer;
