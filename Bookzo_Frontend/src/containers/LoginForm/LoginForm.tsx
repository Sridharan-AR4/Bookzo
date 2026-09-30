import { useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Alert as MuiAlert, Link as MuiLink, Typography } from '@mui/material';

import { AuthForm, TextField } from '@components';
import { PATHS } from '@constants';
import { LoginFormData, loginSchema } from '@features';
import { useLoginMutation } from '@services';
import { getErrorMessage } from '@utils';

import { LocationState } from './LoginForm.types';

/**
 * LoginForm component renders the login UI and handles user authentication.
 * It uses a reusable AuthForm with validation and displays API errors.
 */
export const LoginForm = () => {
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const [submitError, setSubmitError] = useState<string | null>();
    const location = useLocation() as { state: LocationState };

    // get previous page
    const from = location.state?.from?.pathname || PATHS.ROOT;
    /**
     * Handles form submission by calling login API.
     * On success, redirects user to home page.
     * On failure, displays error message using centralized error handler.
     */
    const onSubmit = async (data: LoginFormData) => {
        try {
            setSubmitError(null);
            await login(data).unwrap();
            void navigate(from);
        } catch (err) {
            setSubmitError(getErrorMessage(err));
        }
    };

    return (
        <AuthForm<LoginFormData>
            schema={loginSchema}
            title="Welcome Back"
            subtitle="Log in to continue booking your favorite shows"
            buttonText="Log In"
            onSubmit={onSubmit}
        >
            {({ register, formState: { errors } }) => (
                <>
                    {/* Display API error if login fails */}
                    {submitError && (
                        <MuiAlert severity="error" sx={{ width: '100%' }}>
                            {submitError}
                        </MuiAlert>
                    )}

                    <TextField
                        label="Email"
                        fullWidth
                        required
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Typography variant="body1" textAlign="center">
                        Don’t have an account?
                        <MuiLink component={Link} to={PATHS.SIGNUP}>
                            Sign up
                        </MuiLink>
                    </Typography>
                </>
            )}
        </AuthForm>
    );
};
