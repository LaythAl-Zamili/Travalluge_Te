import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = (darkMode) =>
  createMuiTheme({
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


//  primary: {
//         main: darkMode ? '#ffb28a' : '#FF5700',
//       },
//       secondary: {
//         main: darkMode ? '#f3b9bb' : '#941a1c',
//       },