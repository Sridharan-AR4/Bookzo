import { useNavigate } from 'react-router-dom';

import { Typography as MuiTypography } from '@mui/material';

import { BaseCard } from '@components';
import { API_ENDPOINTS } from '@constants';

import { CinemaCardProps } from './CinemaCard.types';

/**
 * Card component to display cinema details.
 */
export const CinemaCard = ({ name, location, slug }: CinemaCardProps) => {
    const navigate = useNavigate();

    return (
        <BaseCard
            // navigate to cinema slots page on click
            onClick={() =>
                void navigate(`${API_ENDPOINTS.CINEMAS}/${slug}/slots`)
            }
            content={
                <>
                    <MuiTypography variant="h6" fontWeight="bold" noWrap>
                        {name}
                    </MuiTypography>

                    <MuiTypography
                        variant="body2"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {location}
                    </MuiTypography>
                </>
            }
        />
    );
};
