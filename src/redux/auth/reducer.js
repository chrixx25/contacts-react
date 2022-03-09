import { createSlice } from '@reduxjs/toolkit';
import { login, reAuthenticate } from './action';

const initialState = { user: null, isLoggedIn: false, isLoading: false, error: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = true;
            state.error = null;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.isLoading = false;
            state.error = null;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = false;
            state.error = action.payload.error;
        },
        [reAuthenticate.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.isLoading = false;
            state.error = null;
        },
        [reAuthenticate.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = false;
            state.error = action.payload.error;
        },
    }
});
const { reducer } = authSlice;

export default reducer;
