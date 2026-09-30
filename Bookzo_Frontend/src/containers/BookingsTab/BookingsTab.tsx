import { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Booking, BookingStatus } from 'services/booking/booking.types';

import {
    Box as MuiBox,
    Button as MuiButton,
    Chip,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';

import { AppDialog, BookingCard } from '@components';
import {
    useCancelBookingMutation,
    useLazyGetUserBookingsQuery,
} from '@services';
import { getErrorMessage } from '@utils';

/**
 * Extract cursor safely
 */
const extractCursor = (next: string | null) => {
    if (!next) return null;
    try {
        const url = new URL(next, window.location.origin);
        return url.searchParams.get('cursor');
    } catch {
        return null;
    }
};

/**
 * BookingsTab displays user's bookings with filtering, infinite scroll,
 * and allows cancelling bookings using dialog-based flow.
 */
export const BookingsTab = () => {
    // state for bookings data and pagination
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);

    // dialog states for cancel flow
    const [openConfirm, setOpenConfirm] = useState<number | null>(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState<string | null>(null);

    const filters = [
        { key: 'all', label: 'All' },
        { key: 'upcoming', label: 'Upcoming' },
        { key: 'past', label: 'Past' },
        { key: 'cancelled', label: 'Cancelled' },
    ] as const;

    const [filter, setFilter] = useState<
        'all' | 'upcoming' | 'past' | 'cancelled'
    >('all');

    const [cancelingId, setCancelingId] = useState<number | null>(null);

    const [fetchBookings, { isLoading }] = useLazyGetUserBookingsQuery();

    const [cancelBooking] = useCancelBookingMutation();

    /**
     * Initial load
     */
    useEffect(() => {
        const loadBookings = async () => {
            try {
                const res = await fetchBookings({}).unwrap();

                setBookings(res.results);
                setCursor(extractCursor(res.next));
            } catch {
                setBookings([]);
                setCursor(null);
            }
        };

        void loadBookings();
    }, [fetchBookings]);

    /**
     * Infinite scroll
     */
    const fetchNextBookings = async () => {
        if (!cursor) return;

        try {
            const res = await fetchBookings({ cursor }).unwrap();

            setBookings((prev) => {
                const newBookings = res.results.filter(
                    (b) => !prev.some((p) => p.id === b.id),
                );
                return [...prev, ...newBookings];
            });

            setCursor(extractCursor(res.next));
        } catch {
            setCursor(null);
        }
    };

    /**
     * Opens confirm dialog for cancelling a booking.
     */
    const handleCancel = (id: number) => {
        setOpenConfirm(id); // open confirm dialog
    };

    /**
     * Confirms booking cancellation:
     * - Calls cancel API
     * - Updates UI optimistically
     * - Shows success or error dialog
     */
    const handleConfirmCancel = async () => {
        if (!openConfirm) return;

        try {
            setCancelingId(openConfirm);

            await cancelBooking(openConfirm).unwrap();

            setBookings((prev) =>
                prev.map((b) =>
                    b.id === openConfirm
                        ? { ...b, status: BookingStatus.CANCELLED }
                        : b,
                ),
            );

            setOpenConfirm(null);
            setOpenSuccess(true);
        } catch (err) {
            setOpenConfirm(null);
            setOpenError(getErrorMessage(err));
        } finally {
            setCancelingId(null);
        }
    };

    /**
     * Filtering
     */
    const now = new Date();

    const filteredBookings = bookings.filter((b) => {
        if (filter === 'all') return true;

        if (filter === 'upcoming') {
            return (
                b.status === BookingStatus.BOOKED && new Date(b.date_time) > now
            );
        }

        if (filter === 'past') {
            return (
                b.status === BookingStatus.BOOKED &&
                new Date(b.date_time) <= now
            );
        }

        if (filter === 'cancelled') {
            return b.status === BookingStatus.CANCELLED;
        }

        return true;
    });

    return (
        <MuiStack gap={3}>
            {/* Filters */}
            <MuiStack direction="row" gap={1} flexWrap="wrap">
                {filters.map((item) => (
                    <Chip
                        key={item.key}
                        label={item.label}
                        onClick={() => setFilter(item.key)}
                        color={filter === item.key ? 'primary' : 'default'}
                        variant={filter === item.key ? 'filled' : 'outlined'}
                    />
                ))}
            </MuiStack>

            {/* List */}
            {bookings.length === 0 && isLoading ? (
                <MuiBox textAlign="center" py={5}>
                    <MuiTypography>Loading bookings...</MuiTypography>
                </MuiBox>
            ) : filteredBookings.length === 0 && !cursor ? (
                <MuiTypography>No bookings found</MuiTypography>
            ) : (
                <InfiniteScroll
                    dataLength={filteredBookings.length}
                    next={fetchNextBookings}
                    hasMore={!!cursor}
                    loader={
                        <MuiBox textAlign="center" py={2}>
                            <MuiTypography>
                                Loading more bookings...
                            </MuiTypography>
                        </MuiBox>
                    }
                >
                    <MuiStack gap={2}>
                        {filteredBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                status={booking.status}
                                createdAt={booking.created_at}
                                movie={booking.movie}
                                cinema={booking.cinema}
                                dateTime={booking.date_time}
                                language={booking.language}
                                totalSeats={booking.total_seats}
                                totalPrice={booking.total_price}
                                seats={booking.seats}
                                onCancel={() => void handleCancel(booking.id)}
                                isCancelling={cancelingId === booking.id}
                            />
                        ))}
                    </MuiStack>
                </InfiniteScroll>
            )}
            <AppDialog
                open={!!openConfirm}
                onClose={() => setOpenConfirm(null)}
                title="Cancel Booking"
                content={
                    <MuiTypography>
                        Are you sure you want to cancel this booking?
                    </MuiTypography>
                }
                actions={
                    <>
                        <MuiButton onClick={() => setOpenConfirm(null)}>
                            No
                        </MuiButton>

                        <MuiButton
                            variant="contained"
                            color="error"
                            onClick={() => void handleConfirmCancel()}
                        >
                            Yes, Cancel
                        </MuiButton>
                    </>
                }
            />
            <AppDialog
                open={openSuccess}
                onClose={() => setOpenSuccess(false)}
                title="Booking Cancelled"
                content={
                    <MuiTypography>
                        Your booking has been successfully cancelled.
                    </MuiTypography>
                }
                actions={
                    <MuiButton onClick={() => setOpenSuccess(false)}>
                        OK
                    </MuiButton>
                }
            />
            <AppDialog
                open={!!openError}
                onClose={() => setOpenError(null)}
                title="Sorry"
                content={
                    <MuiTypography color="error">{openError}</MuiTypography>
                }
                actions={
                    <MuiButton onClick={() => setOpenError(null)}>
                        Close
                    </MuiButton>
                }
            />
        </MuiStack>
    );
};
