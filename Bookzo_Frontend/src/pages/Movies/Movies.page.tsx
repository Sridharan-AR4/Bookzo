import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
    Box as MuiBox,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import { MovieCard } from '@components';
import { FiltersSidebar } from '@containers';
import { useLazyGetMoviesQuery } from '@services';
import { RootState } from '@store';
import { Genre, Movie } from '@types';

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
 * Movies page displays list of movies with filters and infinite scroll.
 * Filters are synced with URL and API is paginated using cursor-based pagination.
 */
export const Movies = () => {
    const selectedCity = useSelector(
        (state: RootState) => state.city.selectedCity,
    );

    const [movies, setMovies] = useState<Movie[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);

    const [fetchMovies, { isLoading }] = useLazyGetMoviesQuery();
    const [searchParams, setSearchParams] = useSearchParams();

    /**
     * Derive filters from URL (single source of truth).
     */
    const filters = useMemo(
        () => ({
            language: searchParams.get('language')?.split(',') || [],
            genre: searchParams.get('genre')?.split(',') || [],
            release_date: searchParams.get('release_date') || undefined,
        }),
        [searchParams],
    );

    /**
     * Update URL when filters change.
     */
    const handleFiltersChange = (newFilters: {
        language: string[];
        genre: string[];
        release_date?: string;
    }) => {
        const params: Record<string, string> = {};

        if (selectedCity?.name) {
            params.city = selectedCity.name;
        }
        Object.entries(newFilters).forEach(([key, value]) => {
            if (!value) return;

            // handle array filters (language, genre)
            if (Array.isArray(value) && value.length) {
                params[key] = value.join(',');
            }

            // handle single value (release_date)
            if (typeof value === 'string' && value) {
                params[key] = value;
            }
        });

        setSearchParams(params);
    };

    /**
     * Build API params dynamically based on filters and cursor.
     */
    const buildParams = useCallback(
        (cursorValue?: string | null) => ({
            city: selectedCity?.name,
            language: filters.language.join(',') || undefined,
            genre: filters.genre.join(',') || undefined,
            release_date: filters.release_date || undefined,
            cursor: cursorValue || undefined,
        }),
        [selectedCity, filters],
    );

    /**
     * Initial fetch and refetch when filters or city changes.
     */
    useEffect(() => {
        if (!selectedCity) return;

        const loadMovies = async () => {
            try {
                const res = await fetchMovies(buildParams()).unwrap();

                setMovies(res.results);
                setCursor(extractCursor(res.next));
            } catch {
                setMovies([]);
                setCursor(null);
            }
        };

        void loadMovies();
    }, [selectedCity, filters, buildParams, fetchMovies]);

    const prevCityRef = useRef<string | null>(null);

    useEffect(() => {
        if (!selectedCity) return;

        // prevent running if same city
        if (prevCityRef.current === selectedCity.name) return;

        const currentCity = searchParams.get('city');

        if (currentCity === selectedCity.name) return;

        const params: Record<string, string> = {};

        params.city = selectedCity.name;

        if (filters.language.length) {
            params.language = filters.language.join(',');
        }

        if (filters.genre.length) {
            params.genre = filters.genre.join(',');
        }

        if (filters.release_date) {
            params.release_date = filters.release_date;
        }

        setSearchParams(params);

        prevCityRef.current = selectedCity.name; // track last city
    }, [selectedCity, filters, searchParams, setSearchParams]);

    /**
     * Fetch next page for infinite scroll.
     */
    const fetchNextMovies = async () => {
        if (!cursor) return;

        try {
            const res = await fetchMovies(buildParams(cursor)).unwrap();

            setMovies((prev) => {
                // prevent duplicate movies
                const newMovies = res.results.filter(
                    (m: Movie) => !prev.some((p) => p.id === m.id),
                );
                return [...prev, ...newMovies];
            });

            setCursor(extractCursor(res.next));
        } catch {
            setCursor(null);
        }
    };

    return (
        <MuiBox
            display="flex"
            gap={4}
            mt={5}
            flexDirection={{ xs: 'column', md: 'row' }}
        >
            {/* FILTER SIDEBAR */}
            <FiltersSidebar onChange={handleFiltersChange} value={filters} />

            {/* MOVIES */}
            <MuiStack gap={4} flex={1}>
                <MuiTypography variant="h3">
                    Movies In {selectedCity?.name}
                </MuiTypography>

                {isLoading && movies.length === 0 ? (
                    <MuiBox textAlign="center" py={5}>
                        <MuiTypography>Loading movies...</MuiTypography>
                    </MuiBox>
                ) : movies.length === 0 ? (
                    <MuiBox textAlign="center" py={5}>
                        <MuiTypography>No movies found</MuiTypography>
                        <MuiTypography color="text.secondary">
                            Try changing filters
                        </MuiTypography>
                    </MuiBox>
                ) : (
                    <InfiniteScroll
                        dataLength={movies.length}
                        next={fetchNextMovies}
                        hasMore={!!cursor}
                        loader={
                            <MuiBox textAlign="center" py={2}>
                                <MuiTypography>
                                    Loading more movies...
                                </MuiTypography>
                            </MuiBox>
                        }
                    >
                        <MuiGrid container gap={5} p={1}>
                            {movies.map((movie) => (
                                <MuiGrid key={movie.id} size={{ xs: 8, md: 3 }}>
                                    <MovieCard
                                        title={movie.name}
                                        poster={movie.poster}
                                        genre={movie.genre
                                            .map((g: Genre) => g.name)
                                            .join(', ')}
                                        slug={movie.slug}
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
