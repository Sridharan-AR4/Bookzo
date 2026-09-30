import {
    CardActionArea as MuiCardActionArea,
    CardContent as MuiCardContent,
} from '@mui/material';

import { ImageWrapper, StyledCard } from './BaseCard.styles';
import { BaseCardProps } from './BaseCard.types';

/**
 * Reusable BaseCard component.
 * Supports optional click, image and content.
 */
export const BaseCard = ({ onClick, image, content }: BaseCardProps) => (
    <StyledCard>
        {onClick ? (
            <MuiCardActionArea onClick={onClick}>
                {image && <ImageWrapper>{image}</ImageWrapper>}
                <MuiCardContent>{content}</MuiCardContent>
            </MuiCardActionArea>
        ) : (
            <>
                {image && <ImageWrapper>{image}</ImageWrapper>}
                <MuiCardContent>{content}</MuiCardContent>
            </>
        )}
    </StyledCard>
);
