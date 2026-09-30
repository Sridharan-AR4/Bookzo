import { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import {
    Box as MuiBox,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { CinemaCard } from '@components';
import { useLazyGetCinemasQuery } from '@services';
import { RootState } from '@store';
import { Cinema } from '@types';

const MuiGrid = Grid;

// Extract cursor safely
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
 * Displays list of cinemas with infinite scroll based on selected city.
 */
export const Cinemas = () => {
    const selectedCity = useSelector(
        (state: RootState) => state.city.selectedCity,
    );

    const [cinemas, setCinemas] = useState<Cinema[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [error, setError] = useState(false);

    const [fetchCinemas, { isLoading }] = useLazyGetCinemasQuery();

    // Initial fetch
    useEffect(() => {
        if (!selectedCity) {
            setCinemas([]);
            setCursor(null);
            setError(false); // reset error
            return;
        }

        let isActive = true;

        const loadCinemas = async () => {
            try {
                setError(false); // reset before request

                const res = await fetchCinemas({
                    city: selectedCity.name,
                }).unwrap();

                if (!isActive) return;

                setCinemas(res.results);
                setCursor(extractCursor(res.next));
            } catch {
                if (!isActive) return;

                setError(true); // set error instead of clearing data
            }
        };

        void loadCinemas();

        return () => {
            isActive = false;
        };
    }, [selectedCity, fetchCinemas]);

    // Infinite scroll
    const fetchNextCinemas = async () => {
        if (!cursor) return;

        try {
            const res = await fetchCinemas({
                city: selectedCity?.name,
                cursor,
            }).unwrap();

            setCinemas((prev) => {
                const newCinemas = res.results.filter(
                    (c) => !prev.some((p) => p.id === c.id),
                );
                return [...prev, ...newCinemas];
            });

            setCursor(extractCursor(res.next));
        } catch {
            setCursor(null);
        }
    };

    // Page title
    useEffect(() => {
        if (selectedCity?.name) {
            document.title = `Cinemas in ${selectedCity.name} - BookZo`;
        }
    }, [selectedCity]);

    return (
        <MuiBox mt={5}>
            <MuiStack gap={4}>
                <MuiTypography variant="h3">
                    Cinemas In {selectedCity?.name}
                </MuiTypography>

                {/* STATES */}
                {isLoading && cinemas.length === 0 ? (
                    <MuiBox textAlign="center" py={5}>
                        <MuiTypography>Loading cinemas...</MuiTypography>
                    </MuiBox>
                ) : error ? ( // error state added
                    <MuiBox textAlign="center" py={5}>
                        <MuiTypography color="error">
                            Failed to load cinemas
                        </MuiTypography>
                    </MuiBox>
                ) : cinemas.length === 0 ? (
                    <MuiBox textAlign="center" py={5}>
                        <MuiTypography>No cinemas found</MuiTypography>
                        <MuiTypography color="text.secondary">
                            Try selecting a different city
                        </MuiTypography>
                    </MuiBox>
                ) : (
                    <InfiniteScroll
                        dataLength={cinemas.length}
                        next={fetchNextCinemas}
                        hasMore={!!cursor}
                        loader={
                            <MuiBox textAlign="center" py={2}>
                                <MuiTypography>
                                    Loading more cinemas...
                                </MuiTypography>
                            </MuiBox>
                        }
                    >
                        <MuiGrid
                            container
                            spacing={3}
                            marginBottom={2}
                            sx={{
                                justifyContent: {
                                    xs: 'center',
                                    sm: 'flex-start',
                                },
                            }}
                        >
                            {cinemas.map((cinema) => (
                                <MuiGrid
                                    key={cinema.id}
                                    size={{ xs: 12, sm: 6, md: 4 }}
                                >
                                    <CinemaCard
                                        name={cinema.name}
                                        location={cinema.location}
                                        slug={cinema.slug}
                                    />
                                </MuiGrid>
                            ))}
                        </MuiGrid>
                    </InfiniteScroll>
                )}
            </MuiStack>
        </MuiBox>
    );
};
