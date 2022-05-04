import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchCourierOrdersService } from 'services/CourierOrders';

export const fetchCourierOrders = createAsyncThunk(
  'courierOrders/list',
  async () => {
    const response = await fetchCourierOrdersService();
    return response;
  }
);

const courierOrdersAdapter = createEntityAdapter();

const initialState = courierOrdersAdapter.getInitialState({ isLoading: false });

const courierOrdersSlice = createSlice({
  name: 'courierOrders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCourierOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourierOrders.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const { list } = payload;
      courierOrdersAdapter.setAll(state, list);
    });
    builder.addCase(fetchCourierOrders.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export const {} = courierOrdersSlice.actions;

export const {
  selectAll: selectAllCourierOrders,
  selectById: selectCourierOrderById,
} = courierOrdersAdapter.getSelectors(state => state.courierOrders);

export default courierOrdersSlice.reducer;
