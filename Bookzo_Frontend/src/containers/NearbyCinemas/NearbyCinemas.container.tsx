import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid2';

import { CinemaCard, SectionLayout } from '@components';
import { useGetCinemasQuery } from '@services';
import { RootState } from '@store';

const MuiGrid = Grid;

/**
 * Displays nearby cinemas based on selected city.
 */
export const NearbyCinemas = () => {
    const selectedCity = useSelector(
        (state: RootState) => state.city.selectedCity,
    );

    const { data, isLoading, isError } = useGetCinemasQuery(
        { city: selectedCity?.name },
        { skip: !selectedCity },
    );

    const cinemas = data?.results.slice(0, 5) ?? [];

    return (
        <SectionLayout
            title="Nearby Cinemas"
            seeAllLink="/cinemas"
            seeAllText="See All Cinemas >"
            isLoading={isLoading}
            isError={isError}
            isEmpty={cinemas.length === 0}
            emptyText="No cinemas available"
            errorText="Failed to load cinemas"
        >
            <MuiGrid container spacing={3}>
                {cinemas.map((cinema) => (
                    <MuiGrid key={cinema.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <CinemaCard
                            name={cinema.name}
                            location={cinema.location}
                            slug={cinema.slug}
                        />
                    </MuiGrid>
                ))}
            </MuiGrid>
        </SectionLayout>
    );
};
