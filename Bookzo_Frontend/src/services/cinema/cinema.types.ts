import { Cinema, Movie, PaginatedResponse, Slot } from '@types';

/**
 * Response type for paginated cinemas API.
 */
export type CinemaResponse = PaginatedResponse<Cinema>;

/**
 * Movie details with slots inside a cinema.
 */
export interface CinemaMovie extends Pick<Movie, 'id' | 'name' | 'slug'> {
    // list of slots for the movie
    slots: Slot[];
}

/**
 * Cinema details with movies and their slots.
 */
export interface CinemaSlotsResponse extends Omit<Cinema, 'slug'> {
    // list of movies in the cinema
    movies: CinemaMovie[];
}
