import { useNavigate, useParams } from 'react-router-dom';

import {
    Box as MuiBox,
    Button as MuiButton,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';

import { Error } from '@components';
import { PATHS, STATUS_CODES } from '@constants';
import { ReviewContainer } from '@containers';
import { useGetMovieBySlugQuery } from '@services';

/**
 * MovieDetails page displays detailed information about a selected movie.
 * It fetches movie data using slug and shows poster, details, and description.
 */
export const MovieDetails = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const {
        data: movie,
        isLoading,
        isError,
    } = useGetMovieBySlugQuery(slug!, {
        skip: !slug,
    });

    // Loading state
    if (isLoading) {
        return (
            <MuiBox textAlign="center" py={5}>
                <MuiTypography>Loading movie...</MuiTypography>
            </MuiBox>
        );
    }

    // error or movie not found
    if (isError || !movie) {
        return <Error statusCode={STATUS_CODES.NOT_FOUND} />;
    }

    // set dynamic page title
    document.title = `${movie.name} - BookZo`;

    return (
        <MuiBox p={{ xs: 2, md: 4 }}>
            <MuiStack
                direction={{ xs: 'column', md: 'row' }}
                gap={4}
                alignItems={'center'}
            >
                {/* Poster */}
                <MuiBox
                    component="img"
                    src={movie.poster}
                    alt={movie.name}
                    sx={{
                        width: { xs: '100%', md: 300 },
                        borderRadius: 2,
                    }}
                />

                {/* Info */}
                <MuiStack gap={2}>
                    <MuiTypography variant="h3" fontWeight="bold">
                        {movie.name}
                    </MuiTypography>

                    <MuiTypography color="text.secondary">
                        {movie.genre.map((g) => g.name).join(', ')}
                    </MuiTypography>

                    <MuiTypography color="text.secondary">
                        {movie.language.map((l) => l.name).join(', ')}
                    </MuiTypography>

                    <MuiTypography color="text.secondary">
                        {movie.release_date}
                    </MuiTypography>

                    <MuiTypography color="text.secondary">
                        {movie.duration}
                    </MuiTypography>

                    <MuiButton
                        variant="contained"
                        color="error"
                        sx={{ width: 'fit-content', mt: 2 }}
                        onClick={() =>
                            void navigate(`${PATHS.MOVIES}/${slug}/slots`)
                        }
                    >
                        Book Tickets
                    </MuiButton>
                </MuiStack>
            </MuiStack>

            {/* Description */}
            <MuiBox mt={4} mb={4}>
                <MuiTypography variant="h5" fontWeight="bold">
                    About the movie
                </MuiTypography>

                <MuiTypography mt={1} color="text.secondary">
                    {movie.description}
                </MuiTypography>
            </MuiBox>
            <ReviewContainer
                movieId={movie.id}
                movieTitle={movie.name}
                moviePoster={movie.poster}
            />
        </MuiBox>
    );
};
