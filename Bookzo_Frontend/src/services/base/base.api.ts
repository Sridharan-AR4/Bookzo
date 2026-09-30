import { API_ENDPOINTS } from '@constants';
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { clearToken, setToken } from '@slice';
import { RootState } from '@store';
import { AuthResponse } from '@types';

/**
 * Base query configuration for all API calls.
 * Attaches access token and includes credentials for refresh flow.
 */
const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

/**
 * Shared promise to prevent multiple refresh requests.
 */
let refreshPromise: Promise<string | null> | null = null;

const getRequestUrl = (args: string | FetchArgs) =>
    typeof args === 'string' ? args : args.url;

/**
 * Extends baseQuery to handle token refresh on 401 errors.
 */
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, baseApi, extraOptions) => {
    let result = await baseQuery(args, baseApi, extraOptions);
    const requestUrl = getRequestUrl(args);

    if (
        result.error &&
        result.error.status === 401 &&
        requestUrl !== API_ENDPOINTS.REFRESH
    ) {
        if (!refreshPromise) {
            /**
             * Initiates refresh token request and stores promise
             * so that multiple failed requests reuse the same refresh call.
             */
            refreshPromise = (async () => {
                const refreshResult = await baseQuery(
                    { url: API_ENDPOINTS.REFRESH, method: 'POST' },
                    baseApi,
                    extraOptions,
                );

                if (refreshResult.data) {
                    const data = refreshResult.data as AuthResponse;
                    baseApi.dispatch(setToken(data.access));
                    return data.access;
                }

                // Clears token if refresh fails
                baseApi.dispatch(clearToken());
                return null;
            })().finally(() => {
                // Resets promise after completion
                refreshPromise = null;
            });
        }

        const refreshedAccess = await refreshPromise;

        // Retries original request with new access token
        if (refreshedAccess) {
            result = await baseQuery(args, baseApi, extraOptions);
        }
    }

    return result;
};

/**
 * Base API instance used to inject endpoints across the application.
 */
export const baseApi = createApi({
    baseQuery: baseQueryWithReauth,
    // refetchOnFocus: true,
    tagTypes: ['Review'],
    endpoints: () => ({}),
});
