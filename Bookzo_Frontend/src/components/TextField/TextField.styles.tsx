import { styled, TextField as MuiTextField } from '@mui/material';

import { TextFieldProps } from './TextField.types';
export const StyledTextField = styled(MuiTextField, {
    shouldForwardProp: (prop) => prop !== 'Icon' && prop !== 'halfWidth',
})<TextFieldProps>(({ halfWidth, theme: { breakpoints } }) => ({
    width: '100%',
    [breakpoints.up('sm')]: {
        width: halfWidth ? '47%' : '100%',
    },
}));
