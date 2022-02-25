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
      mercury: '#E4E4E4',
    },
    background: {
      default: '#141414',
    },
    text: {
      primary: '#FFF',
      secondary: '#A2A2A2',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 10,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h2: {
      fontSize: '40px',
      fontWeight: 500,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 500,
      textTransform: 'none',
    },
    h4: {
      fontSize: '16px',
      fontWeight: 500,
    },
    body1: {
      fontSize: '16px',
      lineHeight: '16px',
    },
    body2: {
      fontSize: '14px',
      lineHeight: '24px',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1260,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
