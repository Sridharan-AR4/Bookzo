import type { Theme } from '@mui/material/styles';
import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { FONT_WEIGHTS, HTML_FONT_SIZE } from '@constants';

/* Custom px to rem function */
const typographyUtil: TypographyUtils = {
    /**
     * Converts a pixel value to rem units.
     * @param px - The pixel value to convert.
     * @returns The equivalent value in rem units as a string.
     */
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}` + 'rem',
};

// TODO: Add the necessary typographies here.
/**
 * Creates a typography block with various styles
 * @param theme - Theme object to access the breakpoints.
 * @returns The function returns a TypographyOptions object, which includes various typography settings,
 */
const typographyStyle = (theme: Theme): TypographyOptions => ({
    fontWeightRegular: FONT_WEIGHTS.normal,
    fontWeightMedium: FONT_WEIGHTS.medium,
    fontWeightBold: FONT_WEIGHTS.bold,

    h1: {
        fontSize: typographyUtil.pxToRem(28),
        fontWeight: FONT_WEIGHTS.bold,
        lineHeight: 1.5,

        [theme.breakpoints.up('sm')]: {
            fontSize: typographyUtil.pxToRem(34),
        },

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(42),
        },
    },

    h2: {
        fontSize: typographyUtil.pxToRem(22),
        fontWeight: FONT_WEIGHTS.bold,
        lineHeight: 1.5,

        [theme.breakpoints.up('sm')]: {
            fontSize: typographyUtil.pxToRem(26),
        },

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(32),
        },
    },

    h3: {
        fontSize: typographyUtil.pxToRem(18),
        fontWeight: FONT_WEIGHTS.bold,
        lineHeight: 1.5,

        [theme.breakpoints.up('sm')]: {
            fontSize: typographyUtil.pxToRem(20),
        },

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(24),
        },
    },

    h4: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: FONT_WEIGHTS.medium,
        lineHeight: 1.5,

        [theme.breakpoints.up('sm')]: {
            fontSize: typographyUtil.pxToRem(18),
        },

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(20),
        },
    },

    h5: {
        fontSize: typographyUtil.pxToRem(15),
        fontWeight: 500,
        lineHeight: 1.5,

        [theme.breakpoints.up('sm')]: {
            fontSize: typographyUtil.pxToRem(16),
        },

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(18),
        },
    },

    h6: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: 500,
        lineHeight: 1.5,

        [theme.breakpoints.up('sm')]: {
            fontSize: typographyUtil.pxToRem(15),
        },

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(16),
        },
    },

    body1: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: FONT_WEIGHTS.normal,
        lineHeight: 1.5,

        [theme.breakpoints.up('sm')]: {
            fontSize: typographyUtil.pxToRem(15),
        },

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(16),
        },
    },

    body2: {
        fontSize: typographyUtil.pxToRem(13),
        fontWeight: FONT_WEIGHTS.normal,
        lineHeight: 1.5,

        [theme.breakpoints.up('sm')]: {
            fontSize: typographyUtil.pxToRem(14),
        },

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(14),
        },
    },

    caption: {
        fontSize: typographyUtil.pxToRem(12),
        fontWeight: FONT_WEIGHTS.normal,
        lineHeight: 1.5,
    },
});

export const typography = { typographyStyle, typographyUtil };
