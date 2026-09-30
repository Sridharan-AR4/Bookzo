import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '@types';

/**
 * Retrieve stored city from localStorage (if available).
 */
const storedCity = localStorage.getItem('selectedCity');

/**
 * Initial state for city slice.
 */
const initialState = {
    // initialize from localStorage to persist user selection
    selectedCity: storedCity ? (JSON.parse(storedCity) as City) : null,
};

/**
 * citySlice manages selected city state across the application.
 */
const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        /**
         * Set selected city and persist it in localStorage.
         */
        setCity: (state, action: PayloadAction<City>) => {
            state.selectedCity = action.payload;

            // store selected city for persistence across reloads
            localStorage.setItem(
                'selectedCity',
                JSON.stringify(action.payload),
            );
        },

        /**
         * Clear selected city and remove it from localStorage.
         */
        clearCity: (state) => {
            state.selectedCity = null;

            // remove stored city
            localStorage.removeItem('selectedCity');
        },
    },
});

export const { setCity, clearCity } = citySlice.actions;
export const cityReducer = citySlice.reducer;
