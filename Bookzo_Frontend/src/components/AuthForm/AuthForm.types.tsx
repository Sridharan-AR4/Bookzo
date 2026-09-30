import { ReactNode } from 'react';

import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ZodTypeAny } from 'zod';

/**
 * Props for the AuthForm component.
 */
export interface AuthFormProps<T extends FieldValues> {
    /**
     * Title displayed at the top of the form.
     */
    title: string;

    /**
     * Optional subtitle displayed below the title.
     */
    subtitle?: string;

    /**
     * Text displayed on the submit button.
     */
    buttonText: string;

    /**
     * Validation schema used for form validation.
     */
    schema: ZodTypeAny;

    /**
     * Function called on form submission with form data.
     */
    onSubmit: (data: T) => void | Promise<void>;

    /**
     * Render function to display form fields using react-hook-form methods.
     */
    children: (methods: UseFormReturn<T>) => ReactNode;
}
