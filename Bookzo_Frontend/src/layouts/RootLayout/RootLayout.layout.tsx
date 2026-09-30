import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Box as MuiBox, Container as MuiContainer } from '@mui/material';

import { CitySelectionModal } from '@containers';
import { Footer, Header } from '@layouts';
import { useLazyRefreshQuery } from '@services';
import { setCity } from '@slice';
import { City } from '@types';

/**
 * RootLayout handles app layout and restores user session on initial load.
 */
export const RootLayout = () => {
    const [refresh, { isLoading }] = useLazyRefreshQuery();
    const [isBootstrapComplete, setIsBootstrapComplete] = useState(false);

    const dispatch = useDispatch();

    const [cityModalOpen, setCityModalOpen] = useState(false);

    useEffect(() => {
        const bootstrap = async () => {
            try {
                // Attempts to refresh access token on app load
                await refresh().unwrap();
            } catch {
                // Ignore error when user is not logged in
            } finally {
                // Ensures app renders regardless of success or failure
                setIsBootstrapComplete(true);
            }
        };

        void bootstrap();
    }, [refresh]);

    useEffect(() => {
        const storedCity = localStorage.getItem('city');

        if (storedCity) {
            try {
                dispatch(setCity(JSON.parse(storedCity) as City));
            } catch {}
        }
    }, [dispatch]);

    // Prevents rendering UI until authentication check is complete
    if (!isBootstrapComplete || isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <MuiBox display="flex" flexDirection="column" minHeight="100vh">
            <CitySelectionModal
                externalOpen={cityModalOpen}
                onClose={() => setCityModalOpen(false)}
            />
            <Header onCityClick={() => setCityModalOpen(true)} />
            <MuiContainer maxWidth="xl" sx={{ flex: 1 }}>
                <Outlet />
            </MuiContainer>
            <Footer />
        </MuiBox>
    );
};
