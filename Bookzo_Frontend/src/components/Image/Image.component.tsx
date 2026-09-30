import { styled } from '@mui/material';

import { ImageProps } from './Image.types';

/**
 * Styled Image component used to render responsive images.
 * Applies default sizing and object fit for consistent display.
 */
export const Image = styled('img')<ImageProps>(() => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
}));
