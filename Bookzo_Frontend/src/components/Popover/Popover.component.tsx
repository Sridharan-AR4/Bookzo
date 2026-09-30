import { MouseEvent, useId, useState } from 'react';

import { Avatar } from 'components/Avatar';

import {
    Box as MuiBox,
    Popover as MuiPopover,
    Stack as MuiStack,
    Typography,
    useTheme,
} from '@mui/material';

import { StyledButton } from './Popover.styles';
import { PopoverProps } from './Popover.types';

/**
 * Renders a popover triggered by a clickable element.
 * Displays user info and optional content inside the popover.
 */
export const StyledPopover = (props: PopoverProps) => {
    const theme = useTheme();
    const { userName, email, children, content, profilePicture } = props;

    const {
        typography: { pxToRem },
        zIndex,
    } = theme;

    // store anchor element for popover positioning
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    // open popover on click
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // close popover
    const handleClose = () => {
        setAnchorEl(null);
    };

    // generate unique id for accessibility
    const popoverId = useId();

    // check if popover is open
    const open = Boolean(anchorEl);
    const id = open ? popoverId : undefined;

    return (
        <MuiBox zIndex={zIndex.modal}>
            <StyledButton aria-describedby={id} onClick={handleClick}>
                {children}
            </StyledButton>

            <MuiPopover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                disableScrollLock
            >
                <MuiStack padding={pxToRem(12)} gap={1}>
                    <MuiStack direction="row" alignItems="center" gap={1}>
                        <MuiBox>
                            <Avatar src={profilePicture} alt="User profile" />
                        </MuiBox>
                        <MuiStack>
                            <Typography variant="h6">{userName}</Typography>
                            <Typography variant="caption">{email}</Typography>
                        </MuiStack>
                    </MuiStack>

                    {typeof content === 'function'
                        ? content(handleClose)
                        : content}
                </MuiStack>
            </MuiPopover>
        </MuiBox>
    );
};
