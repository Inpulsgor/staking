export enum ButtonVariant {
  contained = 'contained',
  outlined = 'outlined',
}

export interface ButtonProps {
  title: string;
  customStyles?: Record<string, string>;
  customVariant: ButtonVariant;
  color: string;
}
