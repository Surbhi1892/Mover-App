import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: null,
    darkTheme: null,
  },
  reducers: {
    changeTheme(state, { payload }) {
      if (typeof payload.theme !== 'undefined') {
        state.theme = payload.theme;
      }
      if (typeof payload.darkMode !== 'undefined') {
        state.darkMode = payload.darkMode;
      }
    },
    setDefaultTheme(state, { payload }) {
      if (!state.theme) {
        state.theme = payload.theme;
        state.darkMode = payload.darkMode;
      }
    },
  },
  extraReducers: {},
});

export const { changeTheme, setDefaultTheme } = themeSlice.actions;

export const selectInit = state => state.theme;

export default themeSlice.reducer;
