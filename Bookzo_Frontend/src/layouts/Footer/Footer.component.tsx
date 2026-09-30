import { Stack as MuiStack, Typography as MuiTypography } from '@mui/material';

import { FooterWrapper } from './Footer.styles';

/**
 * Footer component for the application
 */
export const Footer = () => (
    <FooterWrapper component="footer" mt={5} py={3} px={2}>
        <MuiStack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            maxWidth="1200px"
            margin="auto"
        >
            {/* Brand */}
            <MuiTypography variant="h6" fontWeight="bold">
                BookZo
            </MuiTypography>

            {/* Links */}
            <MuiStack direction="column" alignItems="center" gap={0.5}>
                <MuiTypography variant="body2" color="text.secondary">
                    Book your favorite movies with ease
                </MuiTypography>

                <MuiTypography variant="caption" color="text.secondary">
                    Fast • Simple • Reliable
                </MuiTypography>
            </MuiStack>

            {/* Copyright */}
            <MuiTypography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} BookZo. All rights reserved.
            </MuiTypography>
        </MuiStack>
    </FooterWrapper>
);
