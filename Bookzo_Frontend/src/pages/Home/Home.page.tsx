import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Stack as MuiStack } from '@mui/material';

import { HomeCarousel } from '@components';
import { LatestMovies, NearbyCinemas } from '@containers';
import { RootState } from '@store';
/**
 * Home page displays the main landing content.
 * It includes promotional banners and latest movies and nearby cinemas based on selected city.
 */
export const Home = () => {
    const selectedCity = useSelector(
        (state: RootState) => state.city.selectedCity,
    );

    // set page title
    useEffect(() => {
        document.title = `BookZo - Movie Ticket Booking`;
    }, []);

    return (
        <MuiStack gap={5}>
            <HomeCarousel />
            {selectedCity && <LatestMovies />}
            {selectedCity && <NearbyCinemas />}
        </MuiStack>
    );
};
