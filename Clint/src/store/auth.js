import { createSlice } from '@reduxjs/toolkit'
const initialState = {
   loading: false,
  userInfo: null, 
  error: null,

}
const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        SignInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        SignInSuccess: (state,action) => {
            state.loading = false;
            state.error = null;
            state.userInfo = action.payload;
        },
        SignInFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;

        },
    }
})
export const authActions = auth.actions;
export default auth;