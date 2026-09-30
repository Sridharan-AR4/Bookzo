import { ButtonBase as MuiButtonBase, styled } from '@mui/material';

export const StyledButton = styled(MuiButtonBase)(() => ({
    padding: 0,
    minWidth: 'unset',
    borderRadius: '50%',
}));
