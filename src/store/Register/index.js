import { createAsyncThunk, createSlice,createEntityAdapter } from '@reduxjs/toolkit';
import { registerService } from 'services/Register';

export const fetchRegister = createAsyncThunk(
  'Register',
  async ({ data }) => {
    // console.log("new data",JSON.stringify(data))

    const response = await registerService(data);
    console.log("new res",JSON.stringify(response))
    return response;
  }
);


const registerAdapter = createEntityAdapter();

const initialState = registerAdapter.getInitialState({ isLoading: false });



const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: { },
  extraReducers: builder => {
    builder.addCase(fetchRegister.pending, (state , action) => {

      state.isLoading = true;
      console.log("pending",JSON.stringify(state))

    });
    builder.addCase(fetchRegister.fulfilled, (state , action) => {
      console.log("fulfilled",JSON.stringify(state))
      console.log("fulfilled",JSON.stringify(action))
      state.isLoading =false 
      state.payload=action.payload


    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      console.log("rejected",JSON.stringify(state))
      console.log("rejected action",JSON.stringify(action))


    });
  },
});

export const { } = registerSlice.actions;

export const register = state => state.regis;
// export const {  registerRes } =
// registerAdapter.getSelectors(state =>  state.register);
export const registerRes = state => state.register;


export default registerSlice.reducer;
