/**
 * Base type for any entity that only has a name.
 */
type NamedEntity = {
    name: string;
};

export type Language = NamedEntity;
export type Genre = NamedEntity;
export type City = NamedEntity;

/**
 * Represents a movie entity.
 */
export type Movie = {
    id: number;

    /**
     * Movie title.
     */
    name: string;

    /**
     * Movie description/summary.
     */
    description: string;

    /**
     * Duration of the movie (e.g., "2h 30m").
     */
    duration: string;

    /**
     * Poster image URL.
     */
    poster: string;

    /**
     * Release date (YYYY-MM-DD).
     */
    release_date: string;

    /**
     * List of languages available for the movie.
     */
    language: Language[];

    /**
     * List of genres associated with the movie.
     */
    genre: Genre[];

    /**
     * Slug used for routing.
     */
    slug: string;
};
