import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchCountriesService } from 'services/Countries';

export const fetchCountries = createAsyncThunk('countries/list', async () => {
  const response = await fetchCountriesService();
  return response;
});

const countriesAdapter = createEntityAdapter();

const initialState = countriesAdapter.getInitialState({ isLoading: false });

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCountries.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const { countries } = payload;
      countriesAdapter.setAll(state, countries);
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export const {} = countriesSlice.actions;

export const { selectAll: selectAllCountries, selectById: selectCountryById } =
  countriesAdapter.getSelectors(state => state.countries);

export default countriesSlice.reducer;
