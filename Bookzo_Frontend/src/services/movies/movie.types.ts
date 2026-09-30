import { Cinema, Movie, PaginatedResponse, Slot } from '@types';

/**
 * Response type for paginated movies API.
 */
export type MovieResponse = PaginatedResponse<Movie>;

/**
 * Params for fetching movies with filters and pagination.
 */
export interface GetMoviesParams {
    language?: string;
    genre?: string;
    release_date?: string;
    city?: string;
    // fetch latest movies only
    latest_movies?: boolean;
    // cursor for pagination
    cursor?: string;
}

/**
 * Cinema details with slots for a movie.
 */
export interface MovieCinema
    extends Pick<Cinema, 'id' | 'name' | 'location' | 'slug'> {
    // list of slots in the cinema
    slots: Slot[];
}

/**
 * Movie details with cinemas and their slots.
 */
export interface MovieSlotsResponse extends Omit<Movie, 'language' | 'genre'> {
    // list of cinemas showing the movie
    cinemas: MovieCinema[];
}
