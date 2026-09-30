import { Seat } from '@types';

/**
 * Response type for Slot detail endpoint
 */
export interface SlotResponse {
    slot_id: number;
    movie: string;
    cinema: string;
    date_time: string;
    price: number;
    rows: number;
    seats_per_row: number;
    booked_seats: Seat[];
}
