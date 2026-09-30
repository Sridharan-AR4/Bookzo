/**
 * Props for the Styled button(Seat) component
 */
export interface StyledSeatProps {
    /**
     * Refers whether the seat is available or not for booking
     */
    isAvailable: boolean;

    /**
     * Refers wheter sear is selected or not
     */
    isSelected: boolean;
}

/**
 * Props for the Seat component
 */
export interface SeatProps extends StyledSeatProps {
    /**
     * Number of the seat
     */
    seatNumber: number;

    /**
     * Click handler for the Seat
     */
    onSelect: () => void;
}
