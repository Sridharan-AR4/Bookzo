import { createBrowserRouter } from 'react-router-dom';

import { Error } from '@components';
import { PATHS, STATUS_CODES } from '@constants';
import { LoginForm, SeatLayout, SignupForm } from '@containers';
import { RootLayout } from '@layouts';
import {
    CinemaDetails,
    Cinemas,
    Home,
    MovieDetails,
    Movies,
    MovieSlots,
    UserProfile,
} from '@pages';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

export const router = createBrowserRouter([
    {
        path: PATHS.ROOT,
        element: <RootLayout />,
        errorElement: <Error statusCode={STATUS_CODES.SERVER_ERROR} />,
        children: [
            {
                element: <Home />,
                index: true,
            },
            {
                path: PATHS.LOGIN,
                element: (
                    <PublicRoute>
                        <LoginForm />
                    </PublicRoute>
                ),
            },
            {
                path: PATHS.SIGNUP,
                element: (
                    <PublicRoute>
                        <SignupForm />
                    </PublicRoute>
                ),
            },
            {
                path: PATHS.MOVIES,
                element: <Movies />,
            },
            {
                path: `${PATHS.MOVIES}/:slug`,
                element: <MovieDetails />,
            },
            {
                path: `${PATHS.MOVIES}/:slug/slots`,
                element: <MovieSlots />,
            },
            {
                path: PATHS.CINEMAS,
                element: <Cinemas />,
            },
            {
                path: `${PATHS.CINEMAS}/:slug/slots`,
                element: <CinemaDetails />,
            },
            {
                path: `${PATHS.BOOKINGS}/:slotId`,
                element: <SeatLayout />,
            },
            {
                path: PATHS.PROFILE,
                element: (
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                ),
            },
            {
                path: PATHS.USER_BOOKINGS,
                element: (
                    <ProtectedRoute>
                        <UserProfile />
                    </ProtectedRoute>
                ),
            },
            {
                path: PATHS.NOT_FOUND,
                element: <Error statusCode={STATUS_CODES.NOT_FOUND} />,
            },
        ],
    },
]);
