import { InputAdornment } from '@mui/material';

import { StyledTextField } from './TextField.styles';
import { TextFieldProps } from './TextField.types';

/**
 * TextField component renders a styled input with optional leading icon.
 * The icon, if provided, is displayed at the start of the input field.
 */
export const TextField = (props: TextFieldProps) => {
    const { Icon, halfWidth, ...rest } = props;
    return (
        <StyledTextField
            {...rest}
            halfWidth={halfWidth}
            slotProps={{
                input: {
                    // Adds icon as start adornment when provided.
                    startAdornment: Icon && (
                        <InputAdornment position="start">
                            <Icon />
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};
