import { useEffect, useState } from 'react';

import { Button as MuiButton, Stack as MuiStack } from '@mui/material';

import { ReviewCard } from '@components';
import { ReviewForm } from '@containers';
import { useUser } from '@hooks';
import {
    useDeleteReviewMutation,
    useLazyGetReviewsQuery,
    useReactReviewMutation,
} from '@services';
import { Review } from '@types';
import { getErrorMessage } from '@utils';

import { ReviewContainerProps } from './ReviewContainer.types';

// Extract page safely
const extractPage = (next: string | null) => {
    if (!next) return null;
    try {
        const url = new URL(next, window.location.origin);
        return url.searchParams.get('page');
    } catch {
        return null;
    }
};

/**
 * ReviewContainer handles:
 * - Fetching reviews
 * - Managing user review separately
 * - Reactions (upvote/downvote)
 * - Pagination (Load more)
 * - Add/Edit/Delete review flow
 */
export const ReviewContainer = ({
    movieId,
    movieTitle,
    moviePoster,
}: ReviewContainerProps) => {
    /**
     * Local state:
     * - reviews → list of all reviews
     * - page → pagination page
     * - userReview → current user's review (separated for better control)
     */
    const [reviews, setReviews] = useState<Review[]>([]);
    const [page, setPage] = useState<string | null>(null);
    const [userReview, setUserReview] = useState<Review | null>(null);
    const [fetchReviews, { isLoading, error }] = useLazyGetReviewsQuery();

    const [deleteReview] = useDeleteReviewMutation();
    const [reactReview] = useReactReviewMutation();

    const { user } = useUser();
    const isAuthenticated = !!user;

    const [isEditing, setIsEditing] = useState(false);

    /**
     * Initial load + refetch when user changes
     *
     * user is added as dependency to fetch user-specific data (user_reaction, user_review)
     */
    useEffect(() => {
        const loadReviews = async () => {
            try {
                const res = await fetchReviews({ movieId }).unwrap();

                setReviews(res.results);
                setPage(extractPage(res.next));
                setUserReview(res.user_review);
            } catch {
                // fallback to empty state on failure
                setReviews([]);
                setPage(null);
                setUserReview(null);
            }
        };

        void loadReviews();
    }, [movieId, user, fetchReviews]);

    /**
     * Handles reaction (upvote/downvote)
     */
    const handleReact = async (
        reviewId: number,
        type: 'UPVOTE' | 'DOWNVOTE',
    ) => {
        if (!isAuthenticated) return;

        try {
            const response = await reactReview({ reviewId, type }).unwrap();

            // update review list
            setReviews((prev) =>
                prev.map((review) =>
                    review.id === reviewId
                        ? {
                              ...review,
                              upvotes: response.upvotes,
                              downvotes: response.downvotes,
                              user_reaction: response.user_reaction,
                          }
                        : review,
                ),
            );

            // update user review separately
            if (userReview?.id === reviewId) {
                setUserReview({
                    ...userReview,
                    upvotes: response.upvotes,
                    downvotes: response.downvotes,
                    user_reaction: response.user_reaction,
                });
            }
        } catch (err) {
            alert(getErrorMessage(err));
        }
    };

    /**
     * Handles pagination (Load More)
     */
    const handleLoadMore = async () => {
        if (!page) return;

        try {
            const res = await fetchReviews({
                movieId,
                page: page,
            }).unwrap();

            setReviews((prev) => {
                const newReviews = res.results.filter(
                    (r) => !prev.some((p) => p.id === r.id),
                );
                return [...prev, ...newReviews];
            });

            setPage(extractPage(res.next));
        } catch {
            setPage(null);
        }
    };

    if (isLoading && reviews.length === 0) {
        return <div>Loading...</div>;
    }

    if (error) return <div>Something went wrong</div>;

    return (
        <MuiStack gap={2} sx={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Review Form
                Shows when:
                - User has no review
                - OR user is editing existing review
            */}
            {isAuthenticated && (!userReview || isEditing) && (
                <ReviewForm
                    movie_title={movieTitle}
                    movie_poster={moviePoster}
                    movieId={movieId}
                    reviewId={userReview?.id}
                    initialData={
                        isEditing
                            ? {
                                  title: userReview?.title || '',
                                  description: userReview?.description || '',
                              }
                            : undefined
                    }
                    onSuccess={() => {
                        void (async () => {
                            try {
                                const res = await fetchReviews({
                                    movieId,
                                }).unwrap();

                                setReviews(res.results);
                                setPage(extractPage(res.next));
                                setUserReview(res.user_review);
                                setIsEditing(false);
                            } catch (err) {
                                alert(getErrorMessage(err));
                            }
                        })();
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            )}

            {/* User's own review */}
            {isAuthenticated && userReview && !isEditing && (
                <ReviewCard
                    id={userReview.id}
                    title={userReview.title}
                    description={userReview.description}
                    first_name={userReview.first_name}
                    last_name={userReview.last_name}
                    profile_picture={userReview.profile_picture}
                    upvotes={userReview.upvotes}
                    downvotes={userReview.downvotes}
                    createdAt={userReview.created_at}
                    isOwnReview={true}
                    isAuthenticated={isAuthenticated}
                    onEdit={() => setIsEditing(true)}
                    onDelete={(id) => {
                        void (async () => {
                            try {
                                await deleteReview(id);
                                setUserReview(null);
                            } catch (err) {
                                alert(getErrorMessage(err));
                            }
                        })();
                    }}
                    userReaction={userReview.user_reaction}
                    onReact={(id, type) => {
                        void handleReact(id, type);
                    }}
                />
            )}

            {/* Other users' reviews */}
            {reviews.map((review) => {
                if (review.id === userReview?.id) return null;

                return (
                    <ReviewCard
                        key={review.id}
                        id={review.id}
                        title={review.title}
                        description={review.description}
                        first_name={review.first_name}
                        last_name={review.last_name}
                        profile_picture={review.profile_picture}
                        upvotes={review.upvotes}
                        downvotes={review.downvotes}
                        createdAt={review.created_at}
                        isOwnReview={false}
                        isAuthenticated={isAuthenticated}
                        userReaction={review.user_reaction}
                        onReact={(id, type) => {
                            void handleReact(id, type);
                        }}
                    />
                );
            })}

            {page && (
                <MuiButton
                    variant="contained"
                    color="error"
                    onClick={() => void handleLoadMore()}
                >
                    Load More
                </MuiButton>
            )}
        </MuiStack>
    );
};
