import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchPostOfficesService } from 'services/PostOffices';

export const fetchPostOffices = createAsyncThunk(
  'postOffices/list',
  async () => {
    const response = await fetchPostOfficesService();
    return response;
  }
);

const postOfficesAdapter = createEntityAdapter();

const initialState = postOfficesAdapter.getInitialState({ isLoading: false });

const postOfficesSlice = createSlice({
  name: 'postOffices',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPostOffices.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPostOffices.fulfilled, (state, { payload, meta }) => {
      state.isLoading = false;
      postOfficesAdapter.setAll(state, payload.offices);
    });
    builder.addCase(fetchPostOffices.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = postOfficesSlice.actions;

export const {
  selectAll: selectAllPostOffices,
  selectById: selectPostOfficeById,
} = postOfficesAdapter.getSelectors(state => state.postOffices);

export default postOfficesSlice.reducer;
