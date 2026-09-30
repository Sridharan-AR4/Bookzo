/**
 * Props for the FiltersSidebar component.
 */
export interface FiltersSidebarProps {
    /**
     * Callback triggered when filter values change.
     */
    onChange: (filters: {
        language: string[];
        genre: string[];
        release_date?: string;
    }) => void;

    /**
     * Current selected filter values (controlled from parent).
     */
    value: {
        /**
         * Selected languages.
         */
        language: string[];

        /**
         * Selected genres.
         */
        genre: string[];

        /**
         * Selected release date (optional).
         */
        release_date?: string;
    };
}
