/**
 * Custom hook to debounce a value.
 *
 * Returns a debounced version of the input value after the specified delay.
 * Useful for optimizing performance in scenarios like search inputs or API calls.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 */
import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};
