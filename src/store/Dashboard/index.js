import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchDashboardDataService } from 'services/Dashboard';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/data',
  async (params, thunkAPI) => {
    const response = await fetchDashboardDataService();
    // console.log("resp",JSON.stringify(response))
    return response;
  },
);

const dashboardSlice = createSlice({
  name: 'notifications',
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDashboardData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDashboardData.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
      // console.log("resssssss==========> ",JSON.stringify(state))
    });
    builder.addCase(fetchDashboardData.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = dashboardSlice.actions;

export const selectDashboard = state => state.dashboard;

export default dashboardSlice.reducer;
