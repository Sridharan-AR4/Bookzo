import { BookingStatus } from 'services/booking/booking.types';

import {
    Box as MuiBox,
    Button as MuiButton,
    Chip,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';

import { BaseCard } from '@components';
import {
    currencyFormatter,
    DATE_FORMATTER_OPTIONS,
    dateFormatter,
} from '@utils';

import { BookingCardProps } from './BookingCard.types';

/**
 * Displays a single booking card with details and cancel option.
 */
export const BookingCard = (props: BookingCardProps) => {
    const {
        status,
        createdAt,
        movie,
        cinema,
        dateTime,
        language,
        totalSeats,
        totalPrice,
        seats,
        onCancel,
        isCancelling,
    } = props;

    const showTime = new Date(dateTime);
    const now = new Date();

    // check if cancel allowed
    const canCancel =
        status === BookingStatus.BOOKED && showTime.getTime() > now.getTime();

    // format seats like A10
    const formattedSeats = seats
        .map((s) => `${String.fromCharCode(64 + s.row)}${s.number}`)
        .join(', ');

    const formattedDate = dateFormatter(dateTime, DATE_FORMATTER_OPTIONS);

    const bookedDate = dateFormatter(createdAt, DATE_FORMATTER_OPTIONS);

    return (
        <BaseCard
            content={
                <MuiStack gap={2}>
                    <MuiStack direction="row" justifyContent="space-between">
                        <MuiTypography variant="h6" fontWeight="bold">
                            {movie}
                        </MuiTypography>

                        <Chip
                            label={
                                status === BookingStatus.BOOKED
                                    ? 'Booked'
                                    : 'Cancelled'
                            }
                            color={
                                status === BookingStatus.BOOKED
                                    ? 'success'
                                    : 'default'
                            }
                            size="small"
                        />
                    </MuiStack>

                    <MuiTypography color="text.secondary">
                        {cinema} • {formattedDate}
                    </MuiTypography>

                    <MuiTypography variant="body2">
                        Language: {language}
                    </MuiTypography>

                    <MuiTypography>Seats: {formattedSeats}</MuiTypography>

                    <MuiTypography>Total Seats: {totalSeats}</MuiTypography>

                    <MuiTypography fontWeight="bold">
                        Total Amount: {currencyFormatter(totalPrice)}
                    </MuiTypography>

                    <MuiTypography variant="body2" color="text.secondary">
                        Booked on {bookedDate}
                    </MuiTypography>

                    {status === BookingStatus.BOOKED && (
                        <MuiBox>
                            <MuiButton
                                variant="outlined"
                                color="error"
                                onClick={onCancel}
                                disabled={!canCancel || isCancelling}
                            >
                                {isCancelling
                                    ? 'Cancelling...'
                                    : 'Cancel Booking'}
                            </MuiButton>

                            {!canCancel && (
                                <MuiTypography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                    mt={1}
                                >
                                    Cannot cancel tickets after show starts
                                </MuiTypography>
                            )}
                        </MuiBox>
                    )}
                </MuiStack>
            }
        />
    );
};
