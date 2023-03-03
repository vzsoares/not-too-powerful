import { createTheme } from '@mui/material/styles';

interface coolors {
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    white: PaletteOptions['white'];
    gray: PaletteOptions['gray'];
  }

  interface PaletteOptions {
    white: { main: string };
    gray: coolors;
  }
}
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 448,
      md: 768,
      lg: 1118,
      xl: 1240,
      xxl: 1440,
    },
  },
  palette: {
    primary: { main: '#5865F2' },
    secondary: { main: '#23272A' },
    white: { main: '#FFFFFF' },
    gray: {
      100: '#7b7d7f',
      200: '#65686a',
      300: '#4f5255',
      400: '#393d3f',
      500: '#23272a',
      600: '#202326',
      700: '#1c1f22',
      800: '#191b1d',
      900: '#151719',
    },
  },
  typography: {
    fontFamily: ['Figtree', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
      ',',
    ),
    allVariants: { color: '#FFFFFF' },
  },
});

export default theme;
