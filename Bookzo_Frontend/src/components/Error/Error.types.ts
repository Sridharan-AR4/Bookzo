import { STATUS_CODES } from '@constants';

type StatusCodeValues = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];

/**
 * Props for the Error component.
 */
export interface ErrorProps {
    /**
     * Status code used to determine which error UI to display.
     */
    statusCode: StatusCodeValues;
}
