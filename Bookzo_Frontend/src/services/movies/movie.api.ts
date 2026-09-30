import { API_ENDPOINTS } from '@constants';
import { Movie } from '@types';

import {
    GetMoviesParams,
    MovieResponse,
    MovieSlotsResponse,
} from './movie.types';
import { baseApi } from '../base';

/**
 * movieApi handles movie-related API calls.
 */
export const movieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Fetch paginated list of movies with filters and cursor-based pagination.
         */
        getMovies: builder.query<MovieResponse, GetMoviesParams>({
            query: (params) => ({
                url: `${API_ENDPOINTS.MOVIES}`,
                method: 'GET',
                params,
            }),
        }),

        /**
         * Fetch latest movies (non-paginated).
         */
        getLatestMovies: builder.query<Movie[], GetMoviesParams>({
            query: (params) => ({
                url: `${API_ENDPOINTS.MOVIES}`,
                method: 'GET',
                params: { ...params, latest_movies: true },
            }),
        }),

        /**
         * Fetch movie details using slug.
         */
        getMovieBySlug: builder.query<Movie, string>({
            query: (slug) => ({
                url: `${API_ENDPOINTS.MOVIES}/${slug}`,
                method: 'GET',
            }),
        }),

        /**
         * Fetch movie slots across cinemas for given date and city.
         */
        getMovieSlots: builder.query<
            MovieSlotsResponse,
            { slug: string; date?: string; city?: string }
        >({
            query: ({ slug, date, city }) => ({
                url: `${API_ENDPOINTS.MOVIES}/${slug}/slots`,
                method: 'GET',
                params: { date, city },
            }),
        }),
    }),
});

export const {
    useLazyGetMoviesQuery, // use lazy for infinite scroll
    useGetMoviesQuery,
    useGetMovieBySlugQuery,
    useGetLatestMoviesQuery,
    useGetMovieSlotsQuery,
} = movieApi;
