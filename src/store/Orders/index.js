import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import {
  fetchOrdersDeliveriesService,
  fetchOrdersService,
} from 'services/Orders';

export const fetchOrdersDeliveries = createAsyncThunk(
  'orders/deliveries',
  async () => {
    const response = await fetchOrdersDeliveriesService();
    return response;
  }
);

export const fetchOrders = createAsyncThunk('orders/list', async params => {
  const response = await fetchOrdersService(params);
  return response;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    deliveries: [],
    isLoading: false,
    isLoadingOrders: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchOrders.pending, state => {
      state.isLoadingOrders = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, { payload, meta }) => {
      state.isLoadingOrders = false;
      const { page, delivery } = meta.arg;
      const { data, next_page_url } = payload.orders;
      const hasNextPage = next_page_url !== null;
      const prevData = state[delivery]?.data || [];
      const newData = page === 1 ? data : [...prevData, ...data];
      state[delivery] = {
        data: newData,
        hasNextPage,
      };
    });
    builder.addCase(fetchOrders.rejected, state => {
      state.isLoadingOrders = false;
    });
    builder.addCase(fetchOrdersDeliveries.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrdersDeliveries.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.deliveries = payload.deliveries;
    });
    builder.addCase(fetchOrdersDeliveries.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {} = ordersSlice.actions;

export const selectOrders = state => state.orders;
export const selectOrdersByDelivery = (state, delivery) =>
  state.orders[delivery] || [];

// export const selectOrdersById = createSelector(
//   [
//     (state, { deliveryId }) => selectOrdersByDelivery(state, deliveryId),
//     (state, { id }) => id,
//   ],
//   (orders, { id }) => orders.filter(order => order.id === id)
// );

// export const selectOrderById = createSelector();

export default ordersSlice.reducer;
