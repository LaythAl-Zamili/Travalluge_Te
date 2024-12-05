import { createTheme } from '@material-ui/core/styles';

const customTheme = (darkMode) =>
  createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#00D5FA' : '#00D5FA',
      },
      secondary: {
        main: darkMode ? '#FFFFFF' : '#FFFFFF',
      },
    },
    overrides: {
      MuiTypography: {
        root: {
          wordBreak: 'break-word',
        },
      },
    },
  });

export default customTheme;


