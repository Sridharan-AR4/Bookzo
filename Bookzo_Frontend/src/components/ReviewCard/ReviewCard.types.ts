/**
 * Props for the ReviewCard component.
 */
export interface ReviewCardProps {
    /**
     * Unique ID of the review.
     */
    id: number;

    /**
     * Title of the review.
     */
    title: string;

    /**
     * Description/content of the review.
     */
    description: string;

    /**
     * First name of the reviewer.
     */
    first_name: string;

    /**
     * Last name of the reviewer (optional).
     */
    last_name?: string;

    /**
     * Profile picture URL of the reviewer (optional).
     */
    profile_picture?: string;

    /**
     * Total number of upvotes.
     */
    upvotes: number;

    /**
     * Total number of downvotes.
     */
    downvotes: number;

    /**
     * Review creation date (ISO string).
     */
    createdAt: string;

    /**
     * Indicates if the review belongs to the current user.
     */
    isOwnReview: boolean;

    /**
     * Indicates if the user is authenticated.
     */
    isAuthenticated: boolean;

    /**
     * Callback triggered when edit action is clicked.
     */
    onEdit?: (id: number) => void;

    /**
     * Callback triggered when delete action is clicked.
     */
    onDelete?: (id: number) => void;

    /**
     * Current user's reaction on the review.
     */
    userReaction?: 'UPVOTE' | 'DOWNVOTE' | null;

    /**
     * Callback triggered when user reacts (upvote/downvote).
     */
    onReact: (id: number, type: 'UPVOTE' | 'DOWNVOTE') => void;
}
