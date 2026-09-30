import { API_ENDPOINTS } from '@constants';
import { City } from '@types';

import { baseApi } from '../base/base.api';

/**
 * cityApi handles API calls related to cities.
 * It provides endpoints to fetch available cities for selection.
 */
export const cityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Fetch list of cities.
         */
        getCities: builder.query<City[], void>({
            query: () => ({
                url: API_ENDPOINTS.CITIES,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetCitiesQuery } = cityApi;
