import { API_ENDPOINTS } from '@constants';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { clearToken, setToken } from '@slice';
import { AuthResponse, UserResponse } from '@types';

import { LoginRequest, SignupRequest } from './auth.types';
import { baseApi } from '../base';

/**
 * Auth API handles authentication-related endpoints like login, signup, refresh, and logout.
 * It also manages access token updates in the global state.
 */
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Login user with email and password.
         */
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (data) => ({
                url: API_ENDPOINTS.LOGIN,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setToken(data.access));
                } catch {
                    // Error handled in component via unwrap()
                }
            },
        }),

        /**
         * Register a new user account.
         */
        signup: builder.mutation<AuthResponse, SignupRequest>({
            query: (data) => ({
                url: API_ENDPOINTS.REGISTER,
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setToken(data.access));
                } catch {
                    // Error handled in component via unwrap()
                }
            },
        }),

        /**
         * Refresh access token using refresh token.
         */
        refresh: builder.query<AuthResponse, void>({
            query: () => ({
                url: API_ENDPOINTS.REFRESH,
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setToken(data.access));
                } catch (err) {
                    /**
                     * Clears token if refresh fails due to unauthorized or forbidden status.
                     * Ensures user is logged out when refresh token is invalid or expired.
                     */
                    if (
                        typeof err === 'object' &&
                        err !== null &&
                        'error' in err
                    ) {
                        const fetchError = (
                            err as { error: FetchBaseQueryError }
                        ).error;

                        if (
                            typeof fetchError.status === 'number' &&
                            (fetchError.status === 401 ||
                                fetchError.status === 403)
                        ) {
                            dispatch(clearToken());
                        }
                    }
                }
            },
        }),

        /**
         * Logout user and invalidate session.
         */
        logout: builder.mutation<void, void>({
            query: () => ({
                url: API_ENDPOINTS.LOGOUT,
                method: 'POST',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch {
                    // Error handled in component via unwrap()error handling
                } finally {
                    dispatch(clearToken());
                }
            },
        }),

        /**
         * Fetch current logged-in user details.
         */
        getUser: builder.query<UserResponse, void>({
            query: () => ({
                url: API_ENDPOINTS.USER_PROFILE,
                method: 'GET',
            }),
        }),

        updateUser: builder.mutation({
            query: (body: FormData) => ({
                url: API_ENDPOINTS.USER_PROFILE,
                method: 'PATCH',
                body,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useLazyRefreshQuery,
    useLogoutMutation,
    useGetUserQuery,
    useUpdateUserMutation,
} = authApi;
