import {
    AppBar as MuiAppBar,
    Box as MuiBox,
    Button,
    styled,
    Typography as MuiTypography,
} from '@mui/material';

export const StyledAppBar = styled(MuiAppBar)(({ theme }) => {
    const {
        typography: { pxToRem },
    } = theme;

    return {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: pxToRem(8),
        position: 'sticky',
    };
});
export const LogoWrapper = styled(MuiBox)(({ theme }) => {
    const {
        typography: { pxToRem },
        breakpoints,
    } = theme;

    return {
        width: pxToRem(100),
        height: pxToRem(50),
        [breakpoints.up('sm')]: {
            width: pxToRem(130),
        },
    };
});

export const CitySelectionWrapper = styled(Button)(({ theme }) => {
    const {
        typography: { pxToRem },
    } = theme;

    return {
        border: 'none',
        backgroundColor: 'none',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        gap: pxToRem(4),
        cursor: 'pointer',
    };
});

export const CityText = styled(MuiTypography)(({ theme }) => {
    const {
        typography: { pxToRem },
        breakpoints,
    } = theme;

    return {
        maxWidth: pxToRem(60),
        [breakpoints.up('sm')]: {
            maxWidth: pxToRem(120),
        },
    };
});
