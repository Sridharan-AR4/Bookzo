import { API_ENDPOINTS } from '@constants';
import { Genre, Language } from '@types';

import { baseApi } from '../base/base.api';

/**
 * filterApi handles fetching filter-related data such as languages and genres.
 */
export const filterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLanguages: builder.query<Language[], void>({
            query: () => ({
                url: API_ENDPOINTS.LANGUAGES,
                method: 'GET',
            }),
        }),

        getGenres: builder.query<Genre[], void>({
            query: () => ({
                url: API_ENDPOINTS.GENRES,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetLanguagesQuery, useGetGenresQuery } = filterApi;
