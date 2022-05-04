import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
  } from '@reduxjs/toolkit';
  import { fetchCurrenciesService } from 'services/Currencies';
  
  export const fetchCurrencies = createAsyncThunk('currencies/list', async () => {

    const response = await fetchCurrenciesService();
     console.log("res p",JSON.stringify(response))

    return response;
  });
  
  const currenciesAdapter = createEntityAdapter();
  
  const initialState = currenciesAdapter.getInitialState({ isLoading: false });
  
  const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder.addCase(fetchCurrencies.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchCurrencies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const { currencies } = payload;
        currenciesAdapter.setAll(state, currencies);
      });
      builder.addCase(fetchCurrencies.rejected, (state, action) => {
        state.isLoading = false;
      });
    },
  });
  export const {} = currenciesSlice.actions;
  
  export const { selectAll: selectAllCurrencies } =
  currenciesAdapter.getSelectors(state => state.currencies);
  
  export default currenciesSlice.reducer;
  