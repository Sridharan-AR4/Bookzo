import { PaginatedResponse, Review } from '@types';

/**
 * Response type for paginated reviews API.
 */
export interface ReviewResponse extends PaginatedResponse<Review> {
    /**
     * Current user's review for the movie.
     */
    user_review: Review | null;
}

/**
 * Request payload for adding or updating a review.
 */
export interface AddReviewRequest {
    /**
     * Title of the review.
     */
    title: string;

    /**
     * Description/content of the review.
     */
    description: string;
}

/**
 * Response type for reacting to a review.
 */
export interface ReactionResponse {
    /**
     * Updated total upvotes.
     */
    upvotes: number;

    /**
     * Updated total downvotes.
     */
    downvotes: number;

    /**
     * Current user's reaction.
     */
    user_reaction: 'UPVOTE' | 'DOWNVOTE' | null;
}
