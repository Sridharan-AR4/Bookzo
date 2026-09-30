import { StyledSeat } from './Seat.styles';
import { SeatProps } from './Seat.types';

/**
 * Seat Component renders a styled buttonbase with seat number
 * Styled based on availablity and toggles when user clicks
 */
export const Seat = (props: SeatProps) => {
    const { seatNumber, isAvailable, isSelected, onSelect } = props;

    return (
        <StyledSeat
            isAvailable={isAvailable}
            isSelected={isSelected}
            onClick={onSelect}
            disabled={!isAvailable}
            aria-pressed={isSelected}
            aria-label={`Seat ${seatNumber}${isAvailable ? '' : ' unavailable'}`}
        >
            {seatNumber.toString().padStart(2, '0')}
        </StyledSeat>
    );
};
