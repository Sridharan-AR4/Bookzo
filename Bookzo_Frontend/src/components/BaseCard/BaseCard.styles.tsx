import { Box as MuiBox, Card as MuiCard, styled } from '@mui/material';

export const StyledCard = styled(MuiCard)(({ theme }) => {
    const {
        typography: { pxToRem },
    } = theme;
    return {
        width: '100%',
        borderRadius: pxToRem(16),
    };
});

export const ImageWrapper = styled(MuiBox)({
    width: '100%',
    aspectRatio: 0.8,
});
