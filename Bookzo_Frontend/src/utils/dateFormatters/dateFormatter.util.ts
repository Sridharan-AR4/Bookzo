import { LOCALE } from '@constants';

import { DATE_FORMATTER_OPTIONS } from './dateFormatter.options';

/**
 * Formats a given date string into a localized date string based on the specified locale and formatting options.
 *
 * @param date The date value (string or Date) to be formatted.
 * @param options Options for customizing date.
 * @param locale A culturally specific convention for presenting dates.
 * @returns A formatted date string.
 */
export const dateFormatter = (
    date: string | Date,
    options: Intl.DateTimeFormatOptions = DATE_FORMATTER_OPTIONS,
    locale: Intl.LocalesArgument = LOCALE.US,
) => {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
        throw new RangeError(
            `dateFormatter: invalid date value ${String(date)}`,
        );
    }

    return new Intl.DateTimeFormat(locale, options).format(dateObj);
};
