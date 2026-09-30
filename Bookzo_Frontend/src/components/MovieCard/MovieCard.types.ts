/**
 * Props for the MovieCard component.
 */
export interface MovieCardProps {
    /**
     * Poster image URL for the movie.
     */
    poster: string;

    /**
     * Title of the movie.
     */
    title: string;

    /**
     * Genre of the movie (comma separated).
     */
    genre: string;

    /**
     * Slug used for navigation to movie details page.
     */
    slug: string;
}
