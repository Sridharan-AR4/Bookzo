import { z } from 'zod';

// Ensures password has uppercase, lowercase, number and special character
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
);

/**
 * Signup form validation schema.
 */
export const signupSchema = z
    .object({
        email: z.string().email('Invalid email format'),

        first_name: z
            .string()
            .min(2, 'First name must be atleast 2 characters'),

        last_name: z.string().optional().or(z.literal('')),

        password: z
            .string()
            .regex(
                passwordValidation,
                'Password should minimum 6 of characters with at least one uppercase letter, one lowercase letter, one number and one special character',
            ),

        confirm_password: z.string(),

        phone_number: z
            .string()
            .regex(
                /^[6-9]\d{9}$/,
                'Phone number must be 10 digits starting with 6, 7, 8, or 9',
            )
            .or(z.literal(''))
            .optional(),

        profile_picture: z
            .instanceof(File)
            .optional()
            .refine(
                (file) => !file || file.size <= 2_000_000,
                'Max file size is 2MB',
            ),
    })
    // Ensures password and confirm password match
    .refine((data) => data.password === data.confirm_password, {
        message: 'Passwords do not match',
        path: ['confirm_password'],
    });

export type SignupFormData = z.infer<typeof signupSchema>;
