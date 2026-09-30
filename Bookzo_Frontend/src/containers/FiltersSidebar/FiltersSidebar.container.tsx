import {
    Box as MuiBox,
    ButtonBase as MuiButtonbase,
    Chip as MuiChip,
    Divider as MuiDivider,
    TextField as MuiTextField,
    Typography as MuiTypography,
} from '@mui/material';

import { useGetGenresQuery, useGetLanguagesQuery } from '@services';

import { FilterContainer } from './FilterSidebar.styles';
import { FiltersSidebarProps } from './FilterSidebar.types';

/**
 * FiltersSidebar component provides filtering options for movies.
 * It allows users to filter by language, genre, and release date.
 */
export const FiltersSidebar = ({ onChange, value }: FiltersSidebarProps) => {
    const { data: languagesData = [], isLoading: isLanguagesLoading } =
        useGetLanguagesQuery();
    const { data: genresData = [], isLoading: isGenresLoading } =
        useGetGenresQuery();

    // extract names from API response
    const apiLanguages = languagesData.map((l) => l.name);
    const apiGenres = genresData.map((g) => g.name);

    // Controlled values from parent
    const selectedLanguages = value.language;
    const selectedGenres = value.genre;
    const releaseDate = value.release_date || '';

    /**
     * Toggle filter item dynamically (language or genre)
     */
    const toggleItem = (item: string, type: 'language' | 'genre') => {
        const currentList = value[type];

        const exists = currentList.includes(item);

        const updated = exists
            ? currentList.filter((i) => i !== item)
            : [...currentList, item];

        // update parent state with dynamic key
        onChange({
            ...value,
            [type]: updated,
        });
    };

    // Loading state
    if (isLanguagesLoading || isGenresLoading) {
        return (
            <MuiBox>
                <MuiTypography>Loading filters...</MuiTypography>
            </MuiBox>
        );
    }

    return (
        <FilterContainer>
            <MuiBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <MuiTypography variant="h3" fontWeight="bold">
                    Filters
                </MuiTypography>

                <MuiButtonbase
                    // reset all filters
                    onClick={() =>
                        onChange({
                            language: [],
                            genre: [],
                            release_date: undefined,
                        })
                    }
                >
                    Clear All
                </MuiButtonbase>
            </MuiBox>

            {/* Languages */}
            <MuiBox>
                <MuiTypography variant="subtitle1">Languages</MuiTypography>
                <MuiBox display="flex" flexWrap="wrap" gap={1} mt={1}>
                    {apiLanguages.map((lang) => (
                        <MuiChip
                            key={lang}
                            label={lang}
                            clickable
                            // highlight selected filters
                            color={
                                selectedLanguages.includes(lang)
                                    ? 'error'
                                    : 'default'
                            }
                            onClick={() => toggleItem(lang, 'language')}
                        />
                    ))}
                </MuiBox>
            </MuiBox>

            <MuiDivider sx={{ my: 2 }} />

            {/* Genres */}
            <MuiBox>
                <MuiTypography variant="subtitle1">Genres</MuiTypography>
                <MuiBox display="flex" flexWrap="wrap" gap={1} mt={1}>
                    {apiGenres.map((genre) => (
                        <MuiChip
                            key={genre}
                            label={genre}
                            clickable
                            // highlight selected filters
                            color={
                                selectedGenres.includes(genre)
                                    ? 'error'
                                    : 'default'
                            }
                            onClick={() => toggleItem(genre, 'genre')}
                        />
                    ))}
                </MuiBox>
            </MuiBox>

            <MuiDivider sx={{ my: 2 }} />

            {/* Release Date */}
            <MuiBox>
                <MuiTypography variant="subtitle1">Release Date</MuiTypography>
                <MuiTextField
                    type="date"
                    fullWidth
                    value={releaseDate}
                    onChange={(e) =>
                        onChange({
                            language: selectedLanguages,
                            genre: selectedGenres,
                            release_date: e.target.value,
                        })
                    }
                    sx={{ mt: 1 }}
                />
            </MuiBox>
        </FilterContainer>
    );
};
