import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
    Autocomplete as MuiAutocomplete,
    Dialog as MuiDialog,
    DialogContent as MuiDialogContent,
    DialogTitle as MuiDialogTitle,
    TextField as MuiTextField,
} from '@mui/material';

import { useDebounce } from '@hooks';
import { useGetCitiesQuery } from '@services';
import { setCity } from '@slice';
import { RootState } from '@store';
import { City } from '@types';

import { CitySelectionModalProps } from './CitySelectionModal.types';

/**
 * CitySelectionModal component allows users to select their city.
 * It supports searching with debounce and ensures a city is selected before proceeding.
 */
export const CitySelectionModal = ({
    externalOpen,
    onClose,
}: CitySelectionModalProps) => {
    const dispatch = useDispatch();

    const selectedCity = useSelector(
        (state: RootState) => state.city.selectedCity,
    );

    const { data } = useGetCitiesQuery();
    const cities = useMemo(() => data ?? [], [data]);

    const [internalOpen, setInternalOpen] = useState(false);

    const [input, setInput] = useState('');
    const [filteredCities, setFilteredCities] = useState<City[]>([]);

    // debounce input to avoid filtering on every keystroke
    const debouncedInput = useDebounce(input, 500);

    useEffect(() => {
        const search = debouncedInput.toLowerCase().trim();

        // filter cities based on search input
        const updatedCities = cities.filter((city) =>
            city.name.toLowerCase().includes(search),
        );

        setFilteredCities(updatedCities);
    }, [debouncedInput, cities]);

    // modal can be controlled externally or internally
    const open = externalOpen || internalOpen;

    useEffect(() => {
        // force open modal if no city is selected
        if (!selectedCity) {
            setInternalOpen(true);
        }
    }, [selectedCity]);

    const handleSelect = (city: City) => {
        dispatch(setCity(city));
        setInternalOpen(false);
        onClose?.();
    };

    return (
        <MuiDialog
            open={open}
            fullWidth
            sx={{ alignSelf: 'start' }}
            maxWidth="sm"
            onClose={(_, reason) => {
                // prevent closing modal without selecting city
                if (selectedCity && reason === 'backdropClick') {
                    setInternalOpen(false);
                    onClose?.();
                }
            }}
        >
            <MuiDialogTitle>Select Your City</MuiDialogTitle>

            <MuiDialogContent>
                <MuiAutocomplete<City>
                    options={filteredCities}
                    autoHighlight
                    fullWidth
                    value={selectedCity}
                    filterOptions={(x) => x}
                    onInputChange={(_, value) => setInput(value)}
                    onChange={(_, value: City | null) => {
                        if (value) handleSelect(value);
                    }}
                    getOptionLabel={(option: City) => option.name}
                    isOptionEqualToValue={(option, value) =>
                        option.name === value.name
                    }
                    ListboxProps={{
                        style: {
                            maxHeight: '40vh',
                            overflow: 'auto',
                        },
                    }}
                    renderInput={(params) => (
                        <MuiTextField
                            {...params}
                            placeholder="Search city..."
                        />
                    )}
                    onClose={() => {
                        // close only if city is already selected
                        if (selectedCity) {
                            setInternalOpen(false);
                            onClose?.();
                        }
                    }}
                />
            </MuiDialogContent>
        </MuiDialog>
    );
};
