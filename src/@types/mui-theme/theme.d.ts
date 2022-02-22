import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      mercury: string;
      white: string;
      black: string;
    };
  }
  interface PaletteOptions {
    custom: {
      mercury: string;
      white: string;
      black: string;
    };
  }
}
