import { CardProps } from '@mui/material';

/**
 * Props for the SlotCard component.
 */
export interface SlotCardProps extends CardProps {
    /**
     * Time of the movie slot (formatted string).
     */
    slotTime: string;

    /**
     * Percentage of seats already booked for this slot.
     * Used to indicate availability visually.
     */
    bookedPercentage?: number;

    /**
     * Language of the slot
     */
    language?: string;

    /**
     * Price of the slot
     */
    price?: number;
}
