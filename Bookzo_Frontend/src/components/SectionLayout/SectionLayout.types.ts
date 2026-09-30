import { ReactNode } from 'react';

/**
 * Props for the SectionLayout component.
 */
export interface SectionLayoutProps {
    /**
     * Title displayed at the top of the section.
     */
    title: string;

    /**
     * Optional link for the "See All" action.
     */
    seeAllLink?: string;

    /**
     * Optional custom text for the "See All" link.
     */
    seeAllText?: string;

    /**
     * Indicates if the section is in loading state.
     */
    isLoading: boolean;

    /**
     * Indicates if there is an error.
     */
    isError: boolean;

    /**
     * Indicates if there is no data to display.
     */
    isEmpty: boolean;

    /**
     * Message shown when there is no data.
     */
    emptyText: string;

    /**
     * Message shown when an error occurs.
     */
    errorText: string;

    /**
     * Content to be rendered inside the section.
     */
    children: ReactNode;
}
