import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading: false,
  userInfo: null, 
  error: null,

}
const authSlice = createSlice({
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
        // SignOut: (state) => {
        //     state.userInfo = null,
        //     state.loading = false,
        //     state.error = null
        // }
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.userInfo = action.payload
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        DeleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        DeleteUserSuccess: (state) => {
            state.userInfo = null
            state.loading = false;
            state.error = null;
        },
        DeleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;