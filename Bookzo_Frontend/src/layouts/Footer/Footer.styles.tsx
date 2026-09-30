import { Box as MuiBox, BoxProps, styled } from '@mui/material';

export const FooterWrapper = styled(MuiBox)<BoxProps>(({ theme }) => {
    const {
        palette,
        typography: { pxToRem },
    } = theme;
    return {
        borderTop: `${pxToRem(1)} solid ${palette.divider}`,
    };
});
