import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
    Button as MuiButton,
    MenuItem as MuiMenuItem,
    Typography as MuiTypography,
} from '@mui/material';

import { AppDialog, Avatar, StyledPopover } from '@components';
import { PATHS } from '@constants';
import { useUser } from '@hooks';

/**
 * AvatarMenu component renders a user avatar with a popover menu.
 * It provides quick navigation to profile, bookings, upcoming shows, and logout.
 */
export const AvatarMenu = () => {
    const navigate = useNavigate();
    const [openLogout, setOpenLogout] = useState(false);

    const { user, imageUrl, handleLogout } = useUser();

    return (
        <>
            <StyledPopover
                userName={user?.first_name ?? 'user'}
                email={user?.email ?? 'email'}
                profilePicture={imageUrl}
                content={(onClose) => (
                    <>
                        <MuiMenuItem
                            onClick={() => {
                                onClose();
                                // navigate to profile page
                                void navigate(PATHS.PROFILE);
                            }}
                        >
                            Profile
                        </MuiMenuItem>
                        <MuiMenuItem
                            onClick={() => {
                                onClose();
                                // navigate to your bookings page
                                void navigate(PATHS.USER_BOOKINGS);
                            }}
                        >
                            Your Bookings
                        </MuiMenuItem>

                        <MuiMenuItem
                            onClick={() => {
                                onClose();
                                setOpenLogout(true);
                            }}
                        >
                            Logout
                        </MuiMenuItem>
                    </>
                )}
            >
                {/* fallback to first letter if profile image not available */}
                <Avatar src={imageUrl}>{user?.first_name?.[0]}</Avatar>
            </StyledPopover>
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
        </>
    );
};
