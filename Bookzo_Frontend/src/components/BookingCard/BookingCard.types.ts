import { BookingStatus } from 'services/booking/booking.types';

export interface BookingCardProps {
    status: BookingStatus;
    createdAt: string;
    movie: string;
    cinema: string;
    dateTime: string;
    language: string;
    totalSeats: number;
    totalPrice: number;
    seats: {
        row: number;
        number: number;
    }[];

    onCancel?: () => void;
    isCancelling?: boolean;
}
