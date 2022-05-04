import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeToken } from 'helpers/AsyncStorage';
import { azericardPaymentService } from 'services/Payment';
import queryString from 'query-string';

export const azericardPayment = createAsyncThunk(
  'azericardPayment/pay',
  async ({ type, orders, operation, amount, round, courier, package_id }) => {
    const response = await azericardPaymentService({
      type,
      orders,
      operation,
      amount,
      round,
      courier,
      package_id,
    });
    return response;
  }
);

const initialState = {
  isLoading: false,
  isPaymentSuccess: false,
  azericardData: {
    url: null,
    formParams: null,
    stringifiedParams: null,
  },
  hasError: false,
  errorMessage: false,
};

const azericardPaymentSlice = createSlice({
  name: 'azericardPayment',
  initialState,
  reducers: {
    resetPayment: () => initialState,
    paymentSuccess(state, action) {
      state.isPaymentSuccess = true;
    },
    paymentError(state, { payload }) {
      state.hasError = true;
      state.errorMessage = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(azericardPayment.pending, (state, action) => {
      state.isLoading = true;
      state.hasError = false;
      state.azericardData = { url: null, formParams: null };
    });
    builder.addCase(azericardPayment.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const { status, card, data, message } = payload;
      if (status && card) {
        const stringifiedParams = queryString.stringify(data.form_params);
        state.azericardData = { ...data, stringifiedParams };
      } else if (status && !card) {
        state.isPaymentSuccess = true;
      } else {
        state.hasError = true;
        state.errorMessage = message;
      }
    });
    builder.addCase(azericardPayment.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const selectAzericardPayment = state => state.azericardPayment;

export const { resetPayment, paymentError, paymentSuccess } =
  azericardPaymentSlice.actions;

export default azericardPaymentSlice.reducer;
