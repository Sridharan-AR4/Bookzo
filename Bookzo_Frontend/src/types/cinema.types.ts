import { City } from './movie.types';

/**
 * Cinema details.
 */
export interface Cinema {
    // unique id of cinema
    id: number;

    // cinema name
    name: string;

    // cinema location/address
    location: string;

    // number of rows in cinema
    rows: number;

    // seats per row
    seats_per_row: number;

    // city where cinema is located
    city: City;

    // unique slug for navigation
    slug: string;
}
