import { baseApi } from 'services/base';

import { API_ENDPOINTS } from '@constants';

import {
    BookingCursorResponse,
    CreateBookingRequest,
    CreateBookingResponse,
} from './booking.types';

/**
 * Booking API endpoints.
 * Handles booking creation for selected seats and slot.
 */
export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Creates a new booking for a given slot and selected seats.
         */
        createBooking: builder.mutation<
            CreateBookingResponse,
            CreateBookingRequest
        >({
            query: (body) => ({
                url: API_ENDPOINTS.BOOKINGS,
                method: 'POST',
                body,
            }),
        }),

        /**
         * Get user bookings
         */
        getUserBookings: builder.query<
            BookingCursorResponse,
            {
                cursor?: string;
            }
        >({
            query: ({ cursor }) => ({
                url: API_ENDPOINTS.USER_BOOKING_HISTORY,
                params: {
                    cursor,
                },
            }),
        }),

        /**
         * Cancel a booking
         */
        cancelBooking: builder.mutation({
            query: (id: number) => ({
                url: `${API_ENDPOINTS.BOOKINGS}/${id}/cancel`,
                method: 'PATCH',
            }),
        }),
    }),
});

export const {
    useCreateBookingMutation,
    useGetUserBookingsQuery,
    useLazyGetUserBookingsQuery,
    useCancelBookingMutation,
} = bookingApi;
