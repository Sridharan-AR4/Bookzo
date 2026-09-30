/**
 * Slot details for a movie show.
 */
export interface Slot {
    /**
     * Unique id of the slot.
     */
    id: number;

    /**
     * Date and time of the show.
     */
    date_time: string;

    /**
     * Ticket price for the slot.
     */
    price: number;

    /**
     * Language of the movie in this slot.
     */
    language: string;

    /**
     * Percentage of seats already booked.
     */
    booked_seats_percentage: number;
}
