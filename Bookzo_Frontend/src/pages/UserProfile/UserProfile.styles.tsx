import { Box as MuiBox, MenuItem, styled } from '@mui/material';

export const SidebarWrapper = styled(MuiBox)(({ theme }) => {
    const {
        typography: { pxToRem },
    } = theme;

    return {
        borderRight: `${pxToRem(1)} solid #eee`,
        transition: '0.3s',
    };
});

export const StyledMenuItem = styled(MenuItem)(({ theme }) => {
    const { spacing } = theme;

    return {
        gap: spacing(2),
        padding: spacing(1),
        borderRadius: spacing(2),
    };
});
