import { FieldValues, Resolver, useForm } from 'react-hook-form';

import {
    Button as MuiButton,
    Typography as MuiTypography,
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';

import { FormContainer, StyledForm, StyledPaper } from './AuthForm.styles';
import { AuthFormProps } from './AuthForm.types';

/**
 * AuthForm component renders a reusable form with validation support.
 * It accepts props like title, subtitle, buttonText, schema, onSubmit, and children.
 */
export const AuthForm = <T extends FieldValues>(props: AuthFormProps<T>) => {
    const { title, subtitle, buttonText, schema, onSubmit, children } = props;
    const methods = useForm<T>({
        resolver: zodResolver(schema as never) as Resolver<T>,
    });

    return (
        <FormContainer>
            <StyledPaper elevation={2}>
                <MuiTypography variant="h3" textAlign="center">
                    {title}
                </MuiTypography>
                {subtitle && (
                    <MuiTypography variant="body1" textAlign="center">
                        {subtitle}
                    </MuiTypography>
                )}
                <StyledForm
                    onSubmit={(e) => {
                        e.preventDefault();
                        void methods.handleSubmit(onSubmit)(e);
                    }}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '20px',
                    }}
                >
                    {children(methods)}
                    <MuiButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                    >
                        {buttonText}
                    </MuiButton>
                </StyledForm>
            </StyledPaper>
        </FormContainer>
    );
};
