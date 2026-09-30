import { Box as MuiBox, Paper as MuiPaper, styled } from '@mui/material';

export const FormContainer = styled(MuiBox)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
}));
export const StyledForm = styled('form')(({ theme }) => {
    const {
        typography: { pxToRem },
    } = theme;
    return {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: pxToRem(20),
    };
});
export const StyledPaper = styled(MuiPaper)(({ theme }) => {
    const {
        breakpoints,
        spacing,
        typography: { pxToRem },
    } = theme;
    return {
        padding: spacing(4),
        display: 'flex',
        flexDirection: 'column',
        gap: pxToRem(20),

        [breakpoints.up('sm')]: {
            width: pxToRem(450),
        },
    };
});
