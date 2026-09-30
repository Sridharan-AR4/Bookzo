import { Link } from 'react-router-dom';

import {
    Link as MuiLink,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';

import { SectionLayoutProps } from './SectionLayout.types';

/**
 * Layout component to display a section with title, optional "See All" link,
 * and handles loading, error and empty states.
 */
export const SectionLayout = ({
    title,
    seeAllLink,
    seeAllText,
    isLoading,
    isError,
    isEmpty,
    emptyText,
    errorText,
    children,
}: SectionLayoutProps) => (
    <MuiStack gap={4}>
        {/* Header */}
        <MuiStack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <MuiTypography variant="h2">{title}</MuiTypography>

            {/* optional see all link */}
            {seeAllLink && (
                <MuiLink
                    component={Link}
                    to={seeAllLink}
                    variant="body1"
                    color="error"
                    underline="none"
                >
                    {seeAllText || 'See All'}
                </MuiLink>
            )}
        </MuiStack>

        {isLoading ? (
            <MuiTypography>Loading...</MuiTypography>
        ) : isError ? (
            <MuiTypography color="error">{errorText}</MuiTypography>
        ) : isEmpty ? (
            <MuiTypography>{emptyText}</MuiTypography>
        ) : (
            children
        )}
    </MuiStack>
);
