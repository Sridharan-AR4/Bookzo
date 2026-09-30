import { Card as MuiCard, styled } from '@mui/material';

export const StyledCard = styled(MuiCard)(({ theme }) => {
    const {
        typography: { pxToRem },
    } = theme;

    return {
        padding: pxToRem(16),
        borderRadius: pxToRem(4),
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: pxToRem(10),
    };
});
