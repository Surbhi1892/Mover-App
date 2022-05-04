import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchDeliverableCourierOrdersService } from 'services/CourierOrders';

export const fetchDeliverableCourierOrders = createAsyncThunk(
  'deliverableCourierOrders/list',
  async () => {
    const response = await fetchDeliverableCourierOrdersService();
    return response;
  }
);

const deliverableCourierOrdersAdapter = createEntityAdapter();

const initialState = deliverableCourierOrdersAdapter.getInitialState({
  isLoading: false,
});

const courierOrdersSlice = createSlice({
  name: 'deliverableCourierOrders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDeliverableCourierOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchDeliverableCourierOrders.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        const { list } = payload;
        deliverableCourierOrdersAdapter.setAll(state, list);
      }
    );
    builder.addCase(fetchDeliverableCourierOrders.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export const {} = courierOrdersSlice.actions;

export const {
  selectAll: selectAllDeliverableCourierOrders,
  selectById: selectDeliverableCourierOrderById,
} = deliverableCourierOrdersAdapter.getSelectors(
  state => state.deliverableCourierOrders
);

export default courierOrdersSlice.reducer;
