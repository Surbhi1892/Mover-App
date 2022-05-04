import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { saveToken } from 'helpers/AsyncStorage';
import {
  fetchUserService,
  fetchWeightBalanceService,
  signInService,
} from 'services/Auth';

export const signIn = createAsyncThunk('auth/signIn', async credentials => {
  const response = await signInService(credentials);
  const { status, user } = response;
console.log("jdjjdjd")
  if (status) {
    await saveToken(user.token);
  }
  return response;
});

export const fetchUser = createAsyncThunk('auth/me', async () => {
  const response = await fetchUserService();
  return response;
});

export const fetchWeightBalance = createAsyncThunk(
  'auth/weightBalance',
  async () => {
    const response = await fetchWeightBalanceService();
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signingIn: false,
    userToken: null,
    profile: null,
    isLoadingProfile: false,
    isLoadingWeightBalance: false,
    weightBalance: [],
  },
  reducers: {
    restoreToken(state, { payload }) {
      state.userToken = payload;

    },
  },




  
  extraReducers: builder => {
    builder.addCase(signIn.pending, state => {
      state.signingIn = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.signingIn = false;
      console.log("auth",JSON.stringify(payload))

      state.userToken = payload.user.token;
      state.profile = payload.user;
      state.profile.customerCode = payload.user.id + 100000;
    });
    builder.addCase(signIn.rejected, state => {
      state.signingIn = false;
    });
    builder.addCase(fetchUser.pending, state => {
      state.isLoadingProfile = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.isLoadingProfile = false;
      state.profile = payload.user;
      state.profile.customerCode = payload.user.id + 100000;
    });
    builder.addCase(fetchUser.rejected, state => {
      state.isLoadingProfile = false;
    });
    builder.addCase(fetchWeightBalance.pending, state => {
      state.isLoadingWeightBalance = true;
    });
    builder.addCase(fetchWeightBalance.fulfilled, (state, { payload }) => {
      state.isLoadingWeightBalance = false;
      state.weightBalance = payload;
    });
    builder.addCase(fetchWeightBalance.rejected, state => {
      state.isLoadingWeightBalance = false;
    });
  },
});

export const { restoreToken } = authSlice.actions;
export const selectAuth = state => state.auth;

export default authSlice.reducer;
