import { ReactNode } from 'react';

/**
 * Props for BaseCard component.
 */
export interface BaseCardProps {
    // click handler for card
    onClick?: () => void;

    // optional image content
    image?: ReactNode;

    // main content of the card
    content: ReactNode;
}
