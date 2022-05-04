import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeToken } from 'helpers/AsyncStorage';
import { payTRPaymentService } from 'services/Payment';
import queryString from 'query-string';

export const payTRPayment = createAsyncThunk(
  'payTRPayment/pay',
  async payload => {
    const response = await payTRPaymentService(payload);
    return response;
  }
);

const initialState = {
  isLoading: false,
  isPaymentSuccess: false,
  hasError: false,
  errorMessage: false,
  payTRData: {
    url: null,
    form_params: null,
    stringifiedParams: null,
  },
};

const payTRPaymentSlice = createSlice({
  name: 'payTRPayment',
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
    builder.addCase(payTRPayment.pending, (state, action) => {
      state.isLoading = true;
      state.hasError = false;
      state.payTRData = { url: null, formParams: null };
    });
    builder.addCase(payTRPayment.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const { status, card, data, message } = payload;
      if (status && card) {
        const stringifiedParams = queryString.stringify(data.form_params);
        state.payTRData = { ...data, stringifiedParams };
      } else if (status && !card) {
        state.isPaymentSuccess = true;
      } else {
        state.hasError = true;
        state.errorMessage = message;
      }
    });
    builder.addCase(payTRPayment.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const selectPayTRPayment = state => state.payTRPayment;

export const { resetPayment, paymentError, paymentSuccess } =
  payTRPaymentSlice.actions;

export default payTRPaymentSlice.reducer;


