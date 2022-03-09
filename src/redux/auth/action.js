import { createAsyncThunk } from '@reduxjs/toolkit';
import { getError } from '../../utils/error';
import { getUser, setToken, getToken, removeToken } from '../../utils/token';
import { signIn, checkToken } from '../../services/user';

export const login = createAsyncThunk(
    "auth/login",
    async (payload, thunkAPI) => {
        try {
            const response = await signIn(payload);
            setToken(response.data.token);
            return { user: getUser() };
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: getError(error) });
        }
    }
);

export const reAuthenticate = createAsyncThunk(
    "auth/checkToken",
    async (payload, thunkAPI) => {
        try {
            const response = await checkToken();
            response.data.status && setToken(getToken());
            return { user: getUser() };
        } catch (error) {
            removeToken();
            return thunkAPI.rejectWithValue({ error: getError(error) });
        }
    }
);