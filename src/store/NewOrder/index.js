import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newOrderApi } from 'services/NewOrder';
export const fetchNewOrder = createAsyncThunk(
  'NewOrder',
  async ({ data }) => {
    console.log("new data",JSON.stringify(data))

    const response = await newOrderApi(data);
    // console.log("new res",JSON.stringify(response))
    return response;
  }
);

const CreateOrderSlice = createSlice({
  name: 'NewOrder',
  initialState: {
    orderRes: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNewOrder.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchNewOrder.fulfilled, (state, { payload, meta }) => {
      console.log("fetchNewOrder",JSON.stringify(payload))
      state.isLoading = false;
      state.orderRes = payload;
    });
    builder.addCase(fetchNewOrder.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {} = CreateOrderSlice.actions;

export const selectNewOrder = state => state.NewOrder;


export default CreateOrderSlice.reducer;
