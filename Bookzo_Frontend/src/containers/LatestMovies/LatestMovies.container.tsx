import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid2';

import { MovieCard, SectionLayout } from '@components';
import { useGetLatestMoviesQuery } from '@services';
import { RootState } from '@store';

const MuiGrid = Grid;

/**
 * LatestMovies component displays a list of latest released movies.
 * It fetches movies based on selected city and renders them in a grid layout.
 */
export const LatestMovies = () => {
    const selectedCity = useSelector(
        (state: RootState) => state.city.selectedCity,
    );

    const { data, isLoading, isError } = useGetLatestMoviesQuery(
        {
            // pass city for location-based filtering
            city: selectedCity?.name || undefined,
        },
        {
            // skip API call if city is not selected
            skip: !selectedCity,
        },
    );

    // API returns direct array of latest movies
    const latestMovies = data ?? [];

    return (
        <SectionLayout
            title="Latest Movies"
            seeAllLink="/movies"
            seeAllText="See All Movies >"
            isLoading={isLoading}
            isError={isError}
            isEmpty={latestMovies.length === 0}
            emptyText="No movies available"
            errorText="Failed to load movies"
        >
            <MuiGrid
                container
                gap={5}
                sx={{ justifyContent: { xs: 'center', sm: 'unset' } }}
            >
                {latestMovies.map((movie) => (
                    <MuiGrid
                        key={movie.id}
                        size={{ xs: 8, sm: 3.5, md: 3.5, lg: 2 }}
                    >
                        <MovieCard
                            title={movie.name}
                            poster={movie.poster}
                            genre={movie.genre.map((g) => g.name).join(', ')}
                            slug={movie.slug}
                        />
                    </MuiGrid>
                ))}
            </MuiGrid>
        </SectionLayout>
    );
};
