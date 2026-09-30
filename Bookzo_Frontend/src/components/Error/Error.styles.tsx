import {
    Button as MuiButton,
    ButtonProps as MuiButtonProps,
    styled,
} from '@mui/material';

export const StyledButton = styled(MuiButton)<MuiButtonProps>(({ theme }) => {
    const {
        typography: { pxToRem, fontWeightBold },
        palette,
    } = theme;
    return {
        textTransform: 'none',
        fontWeight: fontWeightBold,
        fontSize: pxToRem(12),
        backgroundColor: palette.error.light,
    };
});
