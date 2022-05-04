import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSingleOrderService } from 'services/Orders';

export const fetchSingleOrder = createAsyncThunk(
  'singleOrder',
  async ({ id }) => {
    const response = await fetchSingleOrderService(id);
    // console.log("res",JSON.stringify(response))
    return response;
  }
);

const singleOrderSlice = createSlice({
  name: 'orders',
  initialState: {
    order: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSingleOrder.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleOrder.fulfilled, (state, { payload, meta }) => {
      state.isLoading = false;
      state.order = payload.order;
    });
    builder.addCase(fetchSingleOrder.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {} = singleOrderSlice.actions;

export const selectSingleOrder = state => state.singleOrder;

export default singleOrderSlice.reducer;
