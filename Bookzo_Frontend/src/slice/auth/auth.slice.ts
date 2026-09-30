import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from './auth.types';

const initialState: AuthState = { accessToken: null };

/**
 * Auth slice manages authentication state such as access token.
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Stores access token after successful authentication.
         */
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },

        /**
         * Clears access token on logout or token expiry.
         */
        clearToken: (state) => {
            state.accessToken = null;
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
