import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchReturnReasonsService } from 'services/Orders';

export const fetchReturnReasons = createAsyncThunk(
  'orders/returnReasons',
  async params => {
    const response = await fetchReturnReasonsService(params);
    return response;
  }
);

const returnReasonsAdapter = createEntityAdapter();
const initialState = returnReasonsAdapter.getInitialState({
  isLoading: false,
});

const returnReasons = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchReturnReasons.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchReturnReasons.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      returnReasonsAdapter.setAll(state, payload.message);
    });
    builder.addCase(fetchReturnReasons.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {} = returnReasons.actions;

export const selectReturnReasons = state => state.returnReasons;

export const { selectAll: selectAllReturnReasons } =
  returnReasonsAdapter.getSelectors(selectReturnReasons);

export default returnReasons.reducer;
