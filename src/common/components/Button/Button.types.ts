export enum ButtonVariant {
  contained = 'contained',
  outlined = 'outlined',
}

export enum ButtonColor {
  white = 'common.white',
  black = 'common.black',
}

export interface ButtonProps {
  title: string;
  customStyles?: Record<string, string>;
  customVariant: ButtonVariant;
  color: ButtonColor;
}
