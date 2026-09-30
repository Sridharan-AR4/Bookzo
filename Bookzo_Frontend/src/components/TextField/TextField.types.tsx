import { SvgIconComponent } from '@mui/icons-material';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material';

/**
 * Props for the TextField component.
 */
export type TextFieldProps = MuiTextFieldProps & {
    /**
     * Optional icon displayed at the start of the input field.
     */
    Icon?: SvgIconComponent;

    /**
     * Controls whether the input should take half width.
     */
    halfWidth?: boolean;
};
