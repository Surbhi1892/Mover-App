import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchWeightPackagesService } from 'services/WeightBalance';

export const fetchWeightPackages = createAsyncThunk(
  'weightBalance/list',
  async () => {
    const response = await fetchWeightPackagesService();
    return response;
  }
);

const weightPackages = createEntityAdapter({ selectId: item => item.name });

const initialStateWeightPackages = weightPackages.getInitialState({
  isLoading: false,
});

const weightBalanceSlice = createSlice({
  name: 'weightBalance',
  initialState: {
    isLoading: false,
    weightPackages: initialStateWeightPackages,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWeightPackages.pending, (state, action) => {
      state.weightPackages.isLoading = true;
    });
    builder.addCase(fetchWeightPackages.fulfilled, (state, { payload }) => {
      state.weightPackages.isLoading = false;
      weightPackages.setAll(state.weightPackages, payload.packages);
    });
    builder.addCase(fetchWeightPackages.rejected, (state, action) => {
      state.weightPackages.isLoading = false;
    });
  },
});

export const {} = weightBalanceSlice.actions;

export const {
  selectAll: selectAllWeightPackages,
  selectById: selectWeightPackagesByCountry,
} = weightPackages.getSelectors(state => state.weightBalance.weightPackages);

export default weightBalanceSlice.reducer;
