import { PaginatedResponse, Seat } from '@types';

/**
 * Payload for create booking request
 */
export interface CreateBookingRequest {
    slot_id: number;
    seats: Seat[];
}

/**
 * Response type for booking request
 */
export interface CreateBookingResponse {
    id: number;
    slot_id: number;
    status: BookingStatus;
    created_at: string;
    seats: Seat[];
    total_price: number;
}

export enum BookingStatus {
    CANCELLED = 0,
    BOOKED = 1,
}

export interface Booking extends CreateBookingResponse {
    movie: string;
    cinema: string;
    date_time: string;
    language: string;
    total_seats: number;
}

/**
 * Response type for paginated bookings api
 */
export type BookingCursorResponse = PaginatedResponse<Booking>;
