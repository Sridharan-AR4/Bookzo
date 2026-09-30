import React, { useEffect, useState } from 'react';

import {
    Box as MuiBox,
    Button as MuiButton,
    Stack as MuiStack,
    TextField as MuiTextField,
    Typography as MuiTypography,
} from '@mui/material';

import { Image } from '@components';
import { useAddReviewMutation, useUpdateReviewMutation } from '@services';

import { ReviewFormProps } from './ReviewForm.types';

/**
 * ReviewForm handles:
 * - Creating a new review
 * - Updating an existing review
 */
export const ReviewForm = ({
    movie_title,
    movie_poster,
    movieId,
    reviewId,
    initialData,
    onSuccess,
    onCancel,
}: ReviewFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    /**
     * API mutations:
     * - addReview → for creating review
     * - updateReview → for editing review
     */
    const [addReview, { isLoading: isAdding }] = useAddReviewMutation();
    const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
    const isSubmitting = isAdding || isUpdating;

    /**
     * Populate form when editing
     * Uses initialData to pre-fill fields
     */
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
        }
    }, [initialData]);

    /**
     * Handles form submission:
     * - Calls add or update API based on mode
     * - Clears form on success
     * - Triggers onSuccess callback
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let response;

            if (initialData && reviewId) {
                // Update existing review
                response = await updateReview({
                    reviewId,
                    data: { title, description },
                }).unwrap();
            } else {
                // Add new review
                response = await addReview({
                    movieId,
                    data: { title, description },
                }).unwrap();
            }

            setTitle('');
            setDescription('');

            onSuccess?.(response);
        } catch {
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                void handleSubmit(e);
            }}
        >
            <MuiStack
                gap={2}
                p={2}
                border="1px solid lightgray"
                borderRadius={1}
            >
                <MuiStack direction="row" alignItems="center" gap={2}>
                    <MuiBox width={100}>
                        <Image src={movie_poster} alt={movie_title} />
                    </MuiBox>
                    <MuiTypography variant="h6">{movie_title}</MuiTypography>
                </MuiStack>

                <MuiTextField
                    label="Review Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                />

                <MuiTextField
                    label="Your Review"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    minRows={4}
                    required
                    fullWidth
                />

                <MuiStack direction="row" gap={2}>
                    <MuiButton
                        variant="contained"
                        color="error"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {initialData ? 'Update Review' : 'Submit Review'}
                    </MuiButton>

                    {initialData && (
                        <MuiButton variant="text" onClick={onCancel}>
                            Cancel
                        </MuiButton>
                    )}
                </MuiStack>
            </MuiStack>
        </form>
    );
};
