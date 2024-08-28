'use client';
import { Open_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const open_sans = Open_Sans({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#47413A',
    },
    secondary: {
      main: '#D0BEA9',
    },
    error: {
      main: '#C79B65',
    },
    background: {
      default: '#efefef',
    },
  },
  typography: {
    fontFamily: open_sans.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#efefef',
          }),
        }),
      },
    },
  },
});

export default theme;
