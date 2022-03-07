// eslint-disable-next-line import/named
import { createTheme, responsiveFontSizes, Theme } from '@mui/material';

let theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#151315',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#000',
      contrastText: '#FFF',
    },
    success: {
      main: '#191819',
      contrastText: '#A2A2A2',
    },
    info: {
      main: '#FFF',
      contrastText: '#002E36',
    },
    custom: {
      mercury: '#404040',
    },
    background: {
      default: '#141414',
    },
    text: {
      primary: '#FFF',
      secondary: '#141414',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h2: {
      fontSize: '20px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '18px',
      fontWeight: 500,
      textTransform: 'none',
    },
    h4: {
      fontSize: '16px',
      fontWeight: 500,
    },
    body1: {
      fontSize: '20px',
      lineHeight: '1',
    },
    body2: {
      fontSize: '16px',
      lineHeight: '1',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1308,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {},
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          maxWidth: '320px',
          width: '100%',
          padding: '20px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderColor: '#404040',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
