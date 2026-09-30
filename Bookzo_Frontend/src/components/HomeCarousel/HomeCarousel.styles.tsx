import { ImageProps } from 'components/Image/Image.types';

import { Box as MuiBox, BoxProps, styled } from '@mui/material';

export const ImgWrapper = styled(MuiBox)<BoxProps & ImageProps>(({ theme }) => {
    const {
        typography: { pxToRem },
        breakpoints,
    } = theme;
    return {
        width: '100%',
        objectFit: 'cover',
        borderRadius: pxToRem(16),
        transition: 'transform 0.4s ease',
        height: pxToRem(180),

        '&:hover': {
            transform: 'scale(1.02)',
        },

        [breakpoints.up('sm')]: {
            height: pxToRem(250),
        },

        [breakpoints.up('md')]: {
            height: pxToRem(320),
        },
    };
});
