import { useNavigate } from 'react-router-dom';

import {
    Box as MuiBox,
    Stack as MuiStack,
    Typography as MuiTypography,
    useTheme,
} from '@mui/material';

import { Image } from '@components';
import { PATHS } from '@constants';

import { errorConfig } from './Error.config';
import { StyledButton } from './Error.styles';
import { ErrorProps } from './Error.types';

/**
 * Error component renders a user-friendly error page based on the status code.
 * It displays an image, message, and a button to navigate back to home.
 */
export const Error = (props: ErrorProps) => {
    const { statusCode } = props;
    const navigate = useNavigate();

    // Select error configuration based on status code.
    const config = errorConfig[statusCode];
    const {
        typography: { pxToRem },
    } = useTheme();
    return (
        <MuiStack
            alignItems="center"
            gap={1}
            justifyContent="center"
            height="90vh"
        >
            <MuiBox maxWidth={pxToRem(650)} height={pxToRem(500)}>
                <Image src={config.image} alt={config.alt} />
            </MuiBox>
            <MuiStack alignItems="center" gap={3}>
                <MuiTypography variant="h1" textAlign="center">
                    {config.heading}
                </MuiTypography>
                <MuiTypography variant="body1" textAlign="center">
                    {config.description}
                </MuiTypography>
                <StyledButton
                    variant="contained"
                    onClick={() => void navigate(PATHS.ROOT)}
                >
                    Go Back Home
                </StyledButton>
            </MuiStack>
        </MuiStack>
    );
};
