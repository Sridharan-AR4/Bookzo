import { useEffect, useMemo, useState } from 'react';

import { useDebounce } from '@hooks';
import { useGetCitiesQuery } from '@services';
import { City } from '@types';

/**
 * Custom hook to manage city search and filtering logic.
 * Handles fetching cities, debouncing input, and filtering results.
 */
export const useCities = () => {
    const { data } = useGetCitiesQuery();
    const cities = useMemo(() => data ?? [], [data]);

    const [input, setInput] = useState('');
    const [filteredCities, setFilteredCities] = useState<City[]>(cities);

    const debouncedInput = useDebounce(input, 500);

    // filter cities based on debounced input
    useEffect(() => {
        const search = debouncedInput.toLowerCase().trim();

        const updatedCities = cities.filter((city) =>
            city.name.toLowerCase().includes(search),
        );

        setFilteredCities(updatedCities);
    }, [debouncedInput, cities]);

    return {
        filteredCities,
        setInput,
    };
};
