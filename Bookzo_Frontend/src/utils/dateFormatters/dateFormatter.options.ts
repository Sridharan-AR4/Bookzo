/**
 * Date formatting options.
 * - Displays day as a 2-digit number.
 * - Displays month as an abbreviated (3-letter) string.
 * - Displays the full year as a 4-digit number.
 * - Display the hour as 2 digit
 * - Display the minute as 2 digit
 */
export const DATE_FORMATTER_OPTIONS = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
} satisfies Intl.DateTimeFormatOptions;

/**
 * Date formatting options without year
 * - Displays day as a 2-digit number.
 * - Displays month as an abbreviated (3-letter) string.
 */
export const DATE_FORMATTER_OPTIONS_NO_YEAR = {
    day: '2-digit',
    month: 'short',
} satisfies Intl.DateTimeFormatOptions;

/**
 * Time formatting options (HH:MM).
 */
export const TIME_FORMATTER_OPTIONS = {
    hour: '2-digit',
    minute: '2-digit',
} satisfies Intl.DateTimeFormatOptions;
