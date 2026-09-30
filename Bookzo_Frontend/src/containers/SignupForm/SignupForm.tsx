import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Alert as MuiAlert, Link as MuiLink, Typography } from '@mui/material';

import { AuthForm, TextField } from '@components';
import { PATHS } from '@constants';
import type { SignupFormData } from '@features';
import { signupSchema } from '@features';
import { useSignupMutation } from '@services';
import { getErrorMessage } from '@utils';

/**
 * SignupForm component renders the registration UI and handles user signup.
 * It uses AuthForm with validation and displays API errors if signup fails.
 */
export const SignupForm = () => {
    const navigate = useNavigate();
    const [signup] = useSignupMutation();
    const [submitError, setSubmitError] = useState<string | null>();

    /**
     * Handles form submission by calling signup API.
     * On success, redirects user to home page.
     * On failure, displays error message using centralized error handler.
     */
    const onSubmit = async (data: SignupFormData) => {
        try {
            setSubmitError(null);
            await signup(data).unwrap();
            void navigate(PATHS.ROOT);
        } catch (err) {
            setSubmitError(getErrorMessage(err));
        }
    };

    return (
        <AuthForm<SignupFormData>
            schema={signupSchema}
            title="Welcome to BookZo"
            subtitle="Join us and start booking your favorite movies in just a few clicks"
            buttonText="Sign Up"
            onSubmit={onSubmit}
        >
            {({ register, formState: { errors } }) => (
                <>
                    {/* Display API error if signup fails */}
                    {submitError && (
                        <MuiAlert severity="error" sx={{ width: '100%' }}>
                            {submitError}
                        </MuiAlert>
                    )}

                    {/* Using halfWidth for first and last name to align them in a single row */}
                    <TextField
                        label="First Name"
                        halfWidth={true}
                        required
                        {...register('first_name')}
                        error={!!errors.first_name}
                        helperText={errors.first_name?.message}
                    />

                    <TextField
                        label="Last Name"
                        halfWidth={true}
                        {...register('last_name')}
                    />

                    <TextField
                        label="Email"
                        fullWidth
                        required
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        label="Phone Number"
                        fullWidth
                        {...register('phone_number')}
                        error={!!errors.phone_number}
                        helperText={errors.phone_number?.message}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        required
                        fullWidth
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <TextField
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        {...register('confirm_password')}
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password?.message}
                    />

                    <Typography variant="body1" textAlign="center">
                        Already have an account?
                        <MuiLink component={Link} to={PATHS.LOGIN}>
                            Log in
                        </MuiLink>
                    </Typography>
                </>
            )}
        </AuthForm>
    );
};
