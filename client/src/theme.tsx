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
    primary: { main: '#28534E' },
    secondary: { main: '#4EA62F' },
    white: { main: '#FFFFFF' },
    gray: {
      100: '#F7F7F7',
      200: '#EEEEEE',
      300: '#E6E6E6',
      400: '#DDDDDD',
      500: '#D5D5D5',
      600: '#AAAAAA',
      700: '#808080',
      800: '#555555',
      900: '#2B2B2B',
    },
  },
  typography: {
    fontFamily: ['Figtree', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
      ',',
    ),
    allVariants: { color: '#2C2C2C' },
  },
});

export default theme;
