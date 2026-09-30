import { Box as MuiBox, styled } from '@mui/material';

export const FilterContainer = styled(MuiBox)(({ theme }) => {
    const {
        typography: { pxToRem },
        breakpoints,
    } = theme;

    return {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: pxToRem(8),
        [breakpoints.up('md')]: {
            width: pxToRem(250),
        },
    };
});
