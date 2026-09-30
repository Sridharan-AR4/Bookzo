import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
    Box as MuiBox,
    Button as MuiButton,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';

import { AppDialog, Seat } from '@components';
import { PATHS } from '@constants';
import { useUser } from '@hooks';
import { useCreateBookingMutation, useGetSlotQuery } from '@services';
import { clearSeats, toggleSeat } from '@slice';
import { RootState } from '@store';
import {
    currencyFormatter,
    dateFormatter,
    getErrorMessage,
    TIME_FORMATTER_OPTIONS,
} from '@utils';

/**
 * SeatLayout page displays seat arrangement for a selected slot.
 * Allows users to select seats and proceed with booking.
 */
export const SeatLayout = () => {
    const { slotId } = useParams<{ slotId: string }>();

    // state for opening and closing booking confirmation dialog
    const [openDialog, setOpenDialog] = useState(false);

    // state for opening and closing booking successful dialog
    const [openSuccess, setOpenSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // selected seats from global state
    const selectedSeats = useSelector(
        (state: RootState) => state.booking.selectedSeats,
    );

    const { user } = useUser();

    const numericSlotId = Number(slotId);

    const [createBooking, { isLoading: isBooking }] =
        useCreateBookingMutation();

    // fetch slot details including seat layout and booked seats
    const { data, isLoading, isError, refetch, error } = useGetSlotQuery(
        numericSlotId,
        {
            skip: !slotId || isNaN(numericSlotId),
        },
    );

    /**
     * Clear selected seats when slot changes or component unmounts
     */
    useEffect(() => {
        // clear when slot changes
        dispatch(clearSeats());
    }, [slotId, dispatch]);

    if (isLoading) {
        return (
            <MuiBox textAlign="center" py={5}>
                <MuiTypography>Loading seats...</MuiTypography>
            </MuiBox>
        );
    }

    if (isError || !data) {
        return (
            <MuiBox textAlign="center" py={5}>
                <MuiTypography color="error">
                    {getErrorMessage(error)}
                </MuiTypography>
            </MuiBox>
        );
    }

    /**
     * Checks whether a seat is already booked.
     */
    const isSeatBooked = (row: number, col: number) =>
        data.booked_seats.some(
            (seat) => seat.row === row && seat.number === col,
        );

    /**
     * Toggles seat selection in global state.
     */
    const handleSeatToggle = (row: number, number: number) => {
        dispatch(toggleSeat({ row, number }));
    };

    // format slot time for display
    const formatTime = dateFormatter(data.date_time, TIME_FORMATTER_OPTIONS);

    // calculate total price based on selected seats
    const totalPrice = selectedSeats.length * data.price;

    /**
     * Format seats for display
     */
    const formatSeats = (seats: typeof selectedSeats) => {
        if (!seats.length) return 'None';

        return [...seats]
            .sort((a, b) => a.row - b.row || a.number - b.number)
            .map((s) => `${String.fromCharCode(64 + s.row)}${s.number}`)
            .join(', ');
    };

    /**
     * Handles booking flow:
     * - Redirects to login if user is not authenticated
     * - Opens confirmation dialog
     */
    const handleBooking = () => {
        // redirect to login if not authenticated
        if (!user) {
            void navigate(PATHS.LOGIN, {
                state: { from: location },
            });
            return;
        }

        if (selectedSeats.length === 0) return;

        setOpenDialog(true);
    };

    /**
     * Handles booking confirmation:
     * - Calls booking API
     * - Shows success dialog on success
     * - Refetches slot data
     */
    const handleConfirmBooking = async () => {
        setOpenDialog(false);
        try {
            await createBooking({
                slot_id: numericSlotId,
                seats: selectedSeats,
            }).unwrap();

            setOpenSuccess(true);
        } catch (err) {
            alert(getErrorMessage(err));
        } finally {
            void refetch();
        }
    };

    return (
        <MuiBox p={3} margin="auto" maxWidth="fit-content">
            {/* Slot details */}
            <MuiBox mb={3}>
                <MuiTypography variant="h5" fontWeight="bold">
                    {data.movie}
                </MuiTypography>

                <MuiTypography variant="body2" color="text.secondary">
                    {data.cinema} • {formatTime}
                </MuiTypography>
            </MuiBox>

            {/* Seat grid */}
            <MuiBox width="100%" overflow="auto" mb={3}>
                <MuiStack gap={1.5}>
                    {Array.from({ length: data.rows }, (_, rowIndex) => {
                        const rowLetter = String.fromCharCode(65 + rowIndex);

                        return (
                            <MuiBox
                                key={rowIndex}
                                display="flex"
                                alignItems="center"
                                gap={1}
                                minWidth="max-content"
                            >
                                {/* Row label */}
                                <MuiTypography width={24} fontWeight="bold">
                                    {rowLetter}
                                </MuiTypography>

                                {/* Seats */}
                                <MuiStack direction="row" gap={1}>
                                    {Array.from(
                                        { length: data.seats_per_row },
                                        (__, colIndex) => {
                                            const seatNumber = colIndex + 1;

                                            return (
                                                <Seat
                                                    key={`${rowIndex}-${seatNumber}`}
                                                    seatNumber={seatNumber}
                                                    isAvailable={
                                                        !isSeatBooked(
                                                            rowIndex + 1,
                                                            seatNumber,
                                                        )
                                                    }
                                                    isSelected={selectedSeats.some(
                                                        (s) =>
                                                            s.row ===
                                                                rowIndex + 1 &&
                                                            s.number ===
                                                                seatNumber,
                                                    )}
                                                    onSelect={() =>
                                                        handleSeatToggle(
                                                            rowIndex + 1,
                                                            seatNumber,
                                                        )
                                                    }
                                                />
                                            );
                                        },
                                    )}
                                </MuiStack>
                            </MuiBox>
                        );
                    })}
                </MuiStack>
            </MuiBox>

            {/* Selected seats summary */}
            <MuiBox mb={2}>
                <MuiTypography>
                    Selected Seats: {formatSeats(selectedSeats)}
                </MuiTypography>

                <MuiTypography fontWeight="bold">
                    Total: {currencyFormatter(totalPrice)}
                </MuiTypography>
            </MuiBox>

            {/* Booking button */}
            <MuiButton
                variant="contained"
                color="error"
                fullWidth
                disabled={selectedSeats.length === 0 || isBooking}
                onClick={() => void handleBooking()}
            >
                {isBooking ? 'Booking...' : 'Book Tickets'}
            </MuiButton>
            <AppDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                title="Confirm Booking"
                actions={
                    <>
                        <MuiButton onClick={() => setOpenDialog(false)}>
                            Cancel
                        </MuiButton>

                        <MuiButton
                            variant="contained"
                            color="error"
                            onClick={() => void handleConfirmBooking()}
                        >
                            Confirm
                        </MuiButton>
                    </>
                }
                content={
                    <>
                        <MuiTypography>
                            Seats: {selectedSeats.length}
                        </MuiTypography>

                        <MuiTypography>
                            Total: {currencyFormatter(totalPrice)}
                        </MuiTypography>
                    </>
                }
            />
            <AppDialog
                open={openSuccess}
                onClose={() => setOpenSuccess(false)}
                title="Booking Successful"
                actions={
                    <>
                        <MuiButton
                            onClick={() => {
                                setOpenSuccess(false);
                                dispatch(clearSeats());
                                void navigate(PATHS.ROOT);
                            }}
                        >
                            Go Home
                        </MuiButton>

                        <MuiButton
                            variant="contained"
                            color="error"
                            onClick={() => {
                                setOpenSuccess(false);
                                dispatch(clearSeats());
                            }}
                        >
                            Book More
                        </MuiButton>
                    </>
                }
                content={
                    <>
                        <MuiTypography>
                            Seats: {formatSeats(selectedSeats)}
                        </MuiTypography>

                        <MuiTypography>
                            Total: {currencyFormatter(totalPrice)}
                        </MuiTypography>
                    </>
                }
            />
        </MuiBox>
    );
};
