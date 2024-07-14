import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading: false,
  userInfo: null, 
  error: null,
  signOut:false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        SignInStart: (state) => {
            state.loading = true;
            state.error = null;
            state.signOut = false;
        },
        SignInSuccess: (state,action) => {
            state.loading = false;
            state.error = null;
            state.userInfo = action.payload;
            state.signOut = false;
        },
        SignInFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
             state.signOut = false;
        },
        SignOut: (state) => {
            state.userInfo = null,
            state.signOut = true;
            state.loading = false,
            state.error = null
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;