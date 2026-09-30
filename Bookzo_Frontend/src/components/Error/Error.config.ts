import notfound from '@assets/images/notfound.png';
import servererror from '@assets/images/servererror.png';
import { STATUS_CODES } from '@constants';

/**
 * Maps status codes to corresponding UI configuration.
 * Keeps error-related content centralized and avoids conditional logic in components.
 */
export const errorConfig = {
    [STATUS_CODES.NOT_FOUND]: {
        image: notfound,
        alt: 'A torn movie ticket',
        heading: 'Page not found',
        description:
            'Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.',
    },
    [STATUS_CODES.SERVER_ERROR]: {
        image: servererror,
        alt: 'Spilled popcorn bucket',
        heading: 'Something has gone seriously wrong',
        description:
            "It's always time for a coffee break. We should be back by the time you finish your coffee.",
    },
};
