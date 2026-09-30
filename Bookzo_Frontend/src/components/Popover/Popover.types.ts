import { ReactNode } from 'react';

/**
 * Props for the StyledPopover component.
 */
export interface PopoverProps {
    /**
     * Name of the user displayed in the popover.
     */
    userName: string;

    /**
     * Email of the user displayed in the popover.
     */
    email: string;

    /**
     * Optional profile picture URL for the user avatar.
     */
    profilePicture?: string;

    /**
     * Trigger element that opens the popover.
     */
    children: ReactNode;

    /**
     * Optional additional content rendered inside the popover.
     */
    content?: (onClose: () => void) => ReactNode;
}
