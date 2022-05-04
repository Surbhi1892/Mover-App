import { createSlice } from '@reduxjs/toolkit';

const initSlice = createSlice({
  name: 'init',
  initialState: {},
  reducers: {
    initApplication(state, action) {},
  },
  extraReducers: {},
});

export const { initApplication } = initSlice.actions;

export const selectInit = state => state.init;

export default initSlice.reducer;
