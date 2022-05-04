import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newBundleOrder } from 'services/NewBundle';

export const fetchNewBundle = createAsyncThunk(
  'NewBundle',
  async ({ data }) => {
    console.log("new data",JSON.stringify(data))

    const response = await newBundleOrder(data);
    console.log("new res",JSON.stringify(response))
    return response;
  }
);

const NewOrderSlice = createSlice({
  name: 'NewBundle',
  initialState: {
    orderRes: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNewBundle.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchNewBundle.fulfilled, (state, { payload, meta }) => {
      console.log("fulfilled",JSON.stringify(state))
      state.isLoading = false;
      state.orderRes = payload;
    });
    builder.addCase(fetchNewBundle.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {} = NewOrderSlice.actions;

export const selectNewOrder = state => state.NewBundle;


export default NewOrderSlice.reducer;
