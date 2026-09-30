import { useNavigate } from 'react-router-dom';

import { Typography as MuiTypography } from '@mui/material';

import placeholder from '@assets/images/movieplaceholder.png';
import { BaseCard } from '@components';
import { Image } from '@components';
import { PATHS } from '@constants';

import { MovieCardProps } from './MovieCard.types';

/**
 * Card component to display movie details.
 */
export const MovieCard = ({ title, poster, genre, slug }: MovieCardProps) => {
    const navigate = useNavigate();

    return (
        <BaseCard
            // navigate to movie details page on click
            onClick={() => void navigate(`${PATHS.MOVIES}/${slug}`)}
            image={
                <Image
                    src={poster || placeholder}
                    alt={title}
                    sx={{ objectFit: 'unset' }}
                />
            }
            content={
                <>
                    <MuiTypography variant="h5" fontWeight="bold" noWrap>
                        {title}
                    </MuiTypography>

                    <MuiTypography noWrap>{genre}</MuiTypography>
                </>
            }
        />
    );
};
