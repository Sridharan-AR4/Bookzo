/**
 * Formats currency based on locale and currency code.
 */
export const currencyFormatter = (
    amount: number,
    locale: string = navigator.language,
    currency: string = 'INR',
) =>
    new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
