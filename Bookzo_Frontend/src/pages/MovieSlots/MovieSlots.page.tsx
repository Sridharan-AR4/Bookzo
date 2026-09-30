import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import {
    Box as MuiBox,
    Stack as MuiStack,
    TextField as MuiTextField,
    Typography as MuiTypography,
} from '@mui/material';

import { SlotCard } from '@components';
import { PATHS } from '@constants';
import { useGetMovieSlotsQuery } from '@services';
import { RootState } from '@store';
import { dateFormatter } from '@utils';
import { TIME_FORMATTER_OPTIONS } from '@utils';

/**
 * Displays movie slots across cinemas for selected date and city.
 */
export const MovieSlots = () => {
    const { slug } = useParams<{ slug: string }>();

    const selectedCity = useSelector(
        (state: RootState) => state.city.selectedCity,
    );

    const [searchParams, setSearchParams] = useSearchParams();

    const today = new Date().toISOString().split('T')[0];

    // use date from URL or fallback to today
    const selectedDate = searchParams.get('date') || today;

    // read city from URL fallback
    const cityFromUrl = searchParams.get('city');
    const city = cityFromUrl || selectedCity?.name;
    const navigate = useNavigate();

    /**
     * Updates selected date in URL.
     * Keeps city in sync if available.
     */
    const handleDateChange = (date: string) => {
        const params: Record<string, string> = {
            date,
        };

        if (selectedCity?.name) {
            params.city = selectedCity.name;
        }

        setSearchParams(params);
    };

    // fetch movie slots based on slug, date, and city
    const { data, isLoading, isError } = useGetMovieSlotsQuery(
        {
            slug: slug!,
            date: selectedDate,
            city, // use derived city
        },
        {
            skip: !slug || !city,
        },
    );

    // update page title when movie data loads
    useEffect(() => {
        if (data?.name) {
            document.title = `${data.name} - BookZo`;
        }
    }, [data]);

    /**
     * Sync selected city with URL params.
     * Ensures consistency between Redux state and URL.
     */
    useEffect(() => {
        if (!selectedCity) return;

        const currentCity = searchParams.get('city');

        if (currentCity === selectedCity.name) return;

        const currentDate = searchParams.get('date') || today;

        setSearchParams({
            date: currentDate,
            city: selectedCity.name,
        });
    }, [selectedCity]);

    /**
     * Navigates to seat layout page for selected slot.
     */
    const openSeatLayout = (slotId: number) => {
        void navigate(`${PATHS.BOOKINGS}/${slotId}`);
    };

    if (isLoading) {
        return (
            <MuiBox textAlign="center" py={5}>
                <MuiTypography>Loading movie...</MuiTypography>
            </MuiBox>
        );
    }

    if (isError || !data) {
        return (
            <MuiBox textAlign="center" py={5}>
                <MuiTypography color="error">
                    Failed to load movie details
                </MuiTypography>
            </MuiBox>
        );
    }

    return (
        <MuiBox p={{ xs: 2, md: 4 }}>
            <MuiStack gap={4}>
                {/* Movie details */}
                <MuiBox>
                    <MuiTypography variant="h4" fontWeight="bold">
                        {data.name}
                    </MuiTypography>

                    <MuiTypography color="text.secondary">
                        {data.description}
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

                {/* Cinema slots */}
                <MuiStack gap={3}>
                    {data.cinemas.length === 0 ? (
                        <MuiTypography>
                            No shows available for this date
                        </MuiTypography>
                    ) : (
                        data.cinemas.map((cinema) => (
                            <MuiBox key={cinema.id}>
                                <MuiTypography variant="h6" fontWeight="bold">
                                    {cinema.name}
                                </MuiTypography>

                                <MuiTypography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {cinema.location}
                                </MuiTypography>

                                {/* Slot cards */}
                                <MuiStack
                                    direction="row"
                                    flexWrap="wrap"
                                    gap={2}
                                    mt={1}
                                >
                                    {cinema.slots.map((slot) => {
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
