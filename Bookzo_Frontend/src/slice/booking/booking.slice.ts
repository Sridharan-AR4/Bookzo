import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Seat } from '@types';

import { BookingState } from './booking.types';

/**
 * Initial state for the booking slice
 */
const initialState: BookingState = {
    selectedSeats: [],
};

/**
 * bookingSlice manages selected seats state across the appilcation
 */
const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        /**
         * Set and toggles selected seats
         */
        toggleSeat: (state, action: PayloadAction<Seat>) => {
            // check if the seat is already selected
            const exists = state.selectedSeats.some(
                (s) =>
                    s.row === action.payload.row &&
                    s.number === action.payload.number,
            );

            // removes the seat if it already exists
            if (exists) {
                state.selectedSeats = state.selectedSeats.filter(
                    (s) =>
                        !(
                            s.row === action.payload.row &&
                            s.number === action.payload.number
                        ),
                );
            }
            // pushes it to the global state if it's new
            else {
                state.selectedSeats.push(action.payload);
            }
        },

        /**
         * Clear selected seats
         */
        clearSeats: (state) => {
            state.selectedSeats = [];
        },
    },
});

export const { toggleSeat, clearSeats } = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;
