import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@services';
import { authReducer, bookingReducer, cityReducer } from '@slice';

/**
 * Configures the global Redux store with auth state and API slice.
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
        city: cityReducer,
        booking: bookingReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        // Adds RTK Query middleware for caching and API handling
        getDefaultMiddleware().concat(baseApi.middleware),
});

/**
 * Root state type derived from the store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Dispatch type for use across the application.
 */
export type AppDispatch = typeof store.dispatch;
