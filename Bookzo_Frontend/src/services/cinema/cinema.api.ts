import { API_ENDPOINTS } from '@constants';

import { CinemaResponse, CinemaSlotsResponse } from './cinema.types';
import { baseApi } from '../base';

/**
 * cinemaApi handles cinema-related API calls.
 */
export const cinemaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Fetch paginated list of cinemas based on city.
         */
        getCinemas: builder.query<
            CinemaResponse,
            {
                city?: string;
                cursor?: string;
            }
        >({
            query: (params) => ({
                url: API_ENDPOINTS.CINEMAS,
                method: 'GET',
                params,
            }),
        }),

        /**
         * Fetch cinema details with movies and slots for a given date.
         */
        getCinemaSlots: builder.query<
            CinemaSlotsResponse,
            { slug: string; date?: string }
        >({
            query: ({ slug, date }) => ({
                url: `${API_ENDPOINTS.CINEMAS}/${slug}/slots`,
                method: 'GET',
                params: {
                    date,
                },
            }),
        }),
    }),
});

export const {
    useGetCinemasQuery,
    useLazyGetCinemasQuery,
    useGetCinemaSlotsQuery,
} = cinemaApi;
