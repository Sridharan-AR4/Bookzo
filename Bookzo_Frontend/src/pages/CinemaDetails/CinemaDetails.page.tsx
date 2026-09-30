import { useEffect } from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import {
    Box as MuiBox,
    Stack as MuiStack,
    TextField as MuiTextField,
    Typography as MuiTypography,
} from '@mui/material';

import { SlotCard } from '@components';
import { PATHS } from '@constants';
import { useGetCinemaSlotsQuery } from '@services';
import { dateFormatter } from '@utils';
import { TIME_FORMATTER_OPTIONS } from '@utils';

/**
 * Displays cinema details and available movie slots for a selected date.
 */
export const CinemaDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    // get today's date (ISO format for input)
    const today = new Date().toISOString().split('T')[0];

    // use date from URL or fallback to today
    const selectedDate = searchParams.get('date') || today;

    /**
     * Updates selected date in URL.
     */
    const handleDateChange = (date: string) => {
        setSearchParams({ date });
    };

    // fetch cinema slots based on slug and selected date
    const { data, isLoading, isError } = useGetCinemaSlotsQuery(
        {
            slug: slug!,
            date: selectedDate,
        },
        {
            skip: !slug,
        },
    );

    // update page title when cinema data loads
    useEffect(() => {
        if (data?.name) {
            document.title = `${data.name} - BookZo`;
        }
    }, [data]);

    /**
     * Navigates to seat layout page for selected slot.
     */
    const openSeatLayout = (slotId: number) => {
        void navigate(`${PATHS.BOOKINGS}/${slotId}`);
    };

    if (isLoading) {
        return (
            <MuiBox textAlign="center" py={5}>
                <MuiTypography>Loading cinema...</MuiTypography>
            </MuiBox>
        );
    }

    if (isError || !data) {
        return (
            <MuiBox textAlign="center" py={5}>
                <MuiTypography color="error">
                    Failed to load cinema details
                </MuiTypography>
            </MuiBox>
        );
    }

    return (
        <MuiBox p={{ xs: 2, md: 4 }}>
            <MuiStack gap={4}>
                {/* Cinema details */}
                <MuiBox>
                    <MuiTypography variant="h4" fontWeight="bold">
                        {data.name}
                    </MuiTypography>

                    <MuiTypography color="text.secondary">
                        {data.location}
                    </MuiTypography>
                </MuiBox>

                {/* Date selector */}
                <MuiBox maxWidth="250px">
                    <MuiTypography variant="subtitle1">
                        Select Date
                    </MuiTypography>

                    <MuiTextField
                        type="date"
                        value={selectedDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                        inputProps={{
                            min: today, // same logic
                        }}
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                </MuiBox>

                {/* Movies and their slots */}
                <MuiStack gap={3}>
                    {data.movies.length === 0 ? (
                        <MuiTypography>
                            No shows available for this date
                        </MuiTypography>
                    ) : (
                        data.movies.map((movie) => (
                            <MuiBox key={movie.id}>
                                <MuiTypography variant="h6" fontWeight="bold">
                                    {movie.name}
                                </MuiTypography>

                                {/* Slot cards */}
                                <MuiStack
                                    direction="row"
                                    flexWrap="wrap"
                                    gap={2}
                                    mt={1}
                                >
                                    {movie.slots.map((slot) => {
                                        const time = dateFormatter(
                                            slot.date_time,
                                            TIME_FORMATTER_OPTIONS,
                                        );

                                        return (
                                            <SlotCard
                                                key={slot.id}
                                                slotTime={time}
                                                price={slot.price}
                                                language={slot.language}
                                                bookedPercentage={
                                                    slot.booked_seats_percentage
                                                }
                                                onClick={() =>
                                                    openSeatLayout(slot.id)
                                                }
                                            />
                                        );
                                    })}
                                </MuiStack>
                            </MuiBox>
                        ))
                    )}
                </MuiStack>
            </MuiStack>
        </MuiBox>
    );
};
