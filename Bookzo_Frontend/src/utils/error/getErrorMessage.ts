import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

/**
 * Extracts a user-friendly error message from API errors.
 * Handles common status codes and different backend error formats.
 */
export const getErrorMessage = (err: unknown): string => {
    if (typeof err === 'object' && err !== null && 'status' in err) {
        const error = err as FetchBaseQueryError;

        if (error.status === 400) {
            const data = error.data as
                | string[]
                | {
                      detail?: string;
                      non_field_errors?: string[];
                      error?: string;
                  };

            if (Array.isArray(data)) {
                return data.length > 0 ? data[0] : 'Invalid request.';
            }

            if (data?.detail) {
                return data.detail;
            }

            if (data?.non_field_errors?.length) {
                return data.non_field_errors[0];
            }

            if (data?.error) {
                return data.error;
            }

            // Extracts first validation error message from API response
            if (data && typeof data === 'object') {
                const firstKey = Object.keys(data)[0];
                const value = (data as Record<string, string[]>)[firstKey];

                if (Array.isArray(value)) {
                    return value[0];
                }
            }

            return 'Invalid request.';
        }

        if (error.status === 401) {
            return 'Session expired. Please login again.';
        }

        if (error.status === 500) {
            return 'Server error. Please try again later.';
        }

        if (error.status === 'FETCH_ERROR') {
            return 'Unable to connect to server.';
        }
    }

    return 'Something went wrong. Please try again.';
};
