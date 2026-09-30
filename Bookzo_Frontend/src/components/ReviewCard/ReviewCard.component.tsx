import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {
    IconButton as MuiIconButton,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';

import { Avatar } from '@components';
import { dateFormatter } from '@utils';

import { StyledCard } from './ReviewCard.styles';
import { ReviewCardProps } from './ReviewCard.types';

/**
 * Card component to display a single user review.
 * Displays reviewer details, review content, reactions (upvote/downvote),
 * and allows edit/delete actions for the user's own review.
 */
export const ReviewCard = ({
    id,
    title,
    description,
    first_name,
    last_name,
    profile_picture,
    upvotes,
    downvotes,
    createdAt,
    isOwnReview,
    isAuthenticated,
    onEdit,
    onDelete,
    userReaction,
    onReact,
}: ReviewCardProps) => {
    const formattedDate = dateFormatter(createdAt);
    return (
        <StyledCard>
            <MuiStack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <MuiStack direction="row" alignItems="center" gap={1}>
                    <Avatar src={profile_picture} />
                    <MuiTypography variant="subtitle2">
                        {first_name} {last_name}
                    </MuiTypography>
                </MuiStack>

                {isOwnReview && (
                    <MuiStack direction="row" gap={1}>
                        <MuiTypography
                            variant="caption"
                            color="primary"
                            component="button"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => onEdit?.(id)}
                        >
                            Edit
                        </MuiTypography>
                        <MuiTypography
                            variant="caption"
                            color="error"
                            component="button"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => onDelete?.(id)}
                        >
                            Delete
                        </MuiTypography>
                    </MuiStack>
                )}
            </MuiStack>

            <MuiStack>
                <MuiTypography variant="subtitle1" fontWeight="bold">
                    {title}
                </MuiTypography>

                <MuiTypography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {description}
                </MuiTypography>
            </MuiStack>

            <MuiStack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <MuiStack direction="row" gap={2}>
                    <MuiStack direction="row" alignItems="center" gap={1}>
                        <MuiIconButton
                            disabled={!isAuthenticated || isOwnReview}
                            size="small"
                            onClick={() => onReact(id, 'UPVOTE')}
                        >
                            {userReaction === 'UPVOTE' ? (
                                <ThumbUpIcon color="error" fontSize="small" />
                            ) : (
                                <ThumbUpOutlinedIcon fontSize="small" />
                            )}
                        </MuiIconButton>
                        <MuiTypography variant="caption">
                            {upvotes}
                        </MuiTypography>
                    </MuiStack>

                    <MuiStack direction="row" alignItems="center" gap={1}>
                        <MuiIconButton
                            disabled={!isAuthenticated || isOwnReview}
                            size="small"
                            onClick={() => onReact(id, 'DOWNVOTE')}
                        >
                            {userReaction === 'DOWNVOTE' ? (
                                <ThumbDownIcon color="error" fontSize="small" />
                            ) : (
                                <ThumbDownOutlinedIcon fontSize="small" />
                            )}
                        </MuiIconButton>
                        <MuiTypography variant="caption">
                            {downvotes}
                        </MuiTypography>
                    </MuiStack>
                </MuiStack>

                <MuiTypography variant="caption" color="textDisabled">
                    {formattedDate}
                </MuiTypography>
            </MuiStack>
        </StyledCard>
    );
};
