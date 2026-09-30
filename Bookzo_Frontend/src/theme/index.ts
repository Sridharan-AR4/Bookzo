import { createTheme } from '@mui/material/styles';

/* Customized MUI components themes */
import { components } from './components';
/* Customized foundation themes */
import { mixins, typography } from './foundations';

const baseTheme = createTheme({
    mixins,
    components,
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        ...typography.typographyUtil,
    },
});

/* Extend the base theme with additional configurations */
const theme = createTheme(baseTheme, {
    typography: {
        ...typography.typographyStyle(baseTheme),
    },
});

export { theme };
