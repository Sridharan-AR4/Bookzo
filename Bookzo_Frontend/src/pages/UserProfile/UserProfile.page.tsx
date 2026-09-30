import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {
    Box as MuiBox,
    Button as MuiButton,
    IconButton,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';

import { AppDialog } from '@components';
import { PATHS } from '@constants';
import { BookingsTab, UserProfileForm } from '@containers';
import { useUser } from '@hooks';

import { SidebarWrapper, StyledMenuItem } from './UserProfile.styles';

/**
 * Profile page displaying user details and account sections.
 */
export const UserProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(true);

    const [openLogout, setOpenLogout] = useState(false);

    const currentTab =
        location.pathname === PATHS.USER_BOOKINGS ? 'bookings' : 'profile';

    const { handleLogout } = useUser();

    const menuItems = [
        { key: 'profile', label: 'Profile', icon: <PersonIcon /> },
        { key: 'bookings', label: 'Your Bookings', icon: <ReceiptLongIcon /> },
    ];

    return (
        <MuiBox display="flex" minHeight="80vh" mt={2}>
            {/* Sidebar */}
            <SidebarWrapper width={open ? 220 : 50} pt={2}>
                <IconButton onClick={() => setOpen(!open)}>
                    {open ? <CloseIcon /> : <MenuIcon />}
                </IconButton>

                <MuiStack gap={2} mt={3} pr={1}>
                    {menuItems.map((item) => (
                        <StyledMenuItem
                            key={item.key}
                            onClick={() => {
                                if (item.key === 'profile') {
                                    void navigate(PATHS.PROFILE);
                                } else {
                                    void navigate(PATHS.USER_BOOKINGS);
                                }
                            }}
                            sx={{
                                bgcolor:
                                    currentTab === item.key
                                        ? '#f5f5f5'
                                        : 'transparent',
                            }}
                        >
                            {item.icon}

                            {open && (
                                <MuiTypography>{item.label}</MuiTypography>
                            )}
                        </StyledMenuItem>
                    ))}

                    <StyledMenuItem
                        onClick={() => setOpenLogout(true)}
                        sx={{ color: 'red' }}
                    >
                        <LogoutIcon />

                        {open && <MuiTypography>Logout</MuiTypography>}
                    </StyledMenuItem>
                    <AppDialog
                        open={openLogout}
                        onClose={() => setOpenLogout(false)}
                        title="Logout"
                        content={
                            <MuiTypography>
                                Are you sure you want to logout?
                            </MuiTypography>
                        }
                        actions={
                            <>
                                <MuiButton onClick={() => setOpenLogout(false)}>
                                    Cancel
                                </MuiButton>

                                <MuiButton
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        setOpenLogout(false);
                                        void handleLogout();
                                    }}
                                >
                                    Logout
                                </MuiButton>
                            </>
                        }
                    />
                </MuiStack>
            </SidebarWrapper>

            {/* Content */}
            <MuiBox flex={1} p={{ xs: 2, md: 4 }}>
                <MuiBox maxWidth="900px" width="100%" margin="auto">
                    {currentTab === 'profile' && <UserProfileForm />}
                    {currentTab === 'bookings' && <BookingsTab />}
                </MuiBox>
            </MuiBox>
        </MuiBox>
    );
};
