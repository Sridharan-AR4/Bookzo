import { Review } from '@types';

/**
 * Props for the ReviewForm component.
 */
export interface ReviewFormProps {
    /**
     * Title of the movie.
     */
    movie_title: string;

    /**
     * Poster image URL of the movie.
     */
    movie_poster: string;

    /**
     * Unique ID of the movie.
     */
    movieId: number;

    /**
     * ID of the review (optional).
     */
    reviewId?: number;

    /**
     * Initial form data for edit mode.
     */
    initialData?: {
        title: string;
        description: string;
    };

    /**
     * Callback triggered after successful submit (add/update).
     */
    onSuccess?: (review: Review) => void;

    /**
     * Callback triggered when cancel is clicked (edit mode).
     */
    onCancel?: () => void;
}
