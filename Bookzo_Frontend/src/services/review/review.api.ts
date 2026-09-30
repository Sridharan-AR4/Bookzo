import { API_ENDPOINTS } from '@constants';
import { Review } from '@types';

import {
    AddReviewRequest,
    ReactionResponse,
    ReviewResponse,
} from './review.types';
import { baseApi } from '../base';

/**
 * reviewApi handles all review-related API calls.
 */
export const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Fetch paginated list of reviews for a movie.
         *
         * - Uses cursor-based pagination.
         * - Also returns current user's review (user_review).
         */
        getReviews: builder.query<
            ReviewResponse,
            { movieId: number; page?: string }
        >({
            query: ({ movieId, page }) => ({
                url: `${API_ENDPOINTS.MOVIES}/${movieId}${API_ENDPOINTS.REVIEWS}`,
                method: 'GET',
                params: {
                    page,
                },
            }),
            providesTags: ['Review'],
        }),

        /**
         * Add a new review for a movie.
         */
        addReview: builder.mutation<
            Review,
            { movieId: number; data: AddReviewRequest }
        >({
            query: ({ movieId, data }) => ({
                url: `${API_ENDPOINTS.MOVIES}/${movieId}${API_ENDPOINTS.REVIEWS}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Review'],
        }),

        /**
         * Update an existing review.
         */
        updateReview: builder.mutation<
            Review,
            { reviewId: number; data: AddReviewRequest }
        >({
            query: ({ reviewId, data }) => ({
                url: `${API_ENDPOINTS.REVIEWS}/${reviewId}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Review'],
        }),

        /**
         * Delete a review.
         */
        deleteReview: builder.mutation<void, number>({
            query: (reviewId) => ({
                url: `${API_ENDPOINTS.REVIEWS}/${reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Review'],
        }),

        /**
         * React to a review (upvote / downvote).
         */
        reactReview: builder.mutation<
            ReactionResponse,
            { reviewId: number; type: 'UPVOTE' | 'DOWNVOTE' }
        >({
            query: ({ reviewId, type }) => ({
                url: `${API_ENDPOINTS.REVIEWS}/${reviewId}/reaction`,
                method: 'POST',
                body: { type },
            }),
            invalidatesTags: ['Review'],
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useLazyGetReviewsQuery,
    useAddReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useReactReviewMutation,
} = reviewApi;
