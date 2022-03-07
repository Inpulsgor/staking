export enum ButtonVariant {
  contained = 'contained',
  outlined = 'outlined',
}

export enum ButtonColor {
  white = 'common.white',
  black = 'common.black',
}

export enum ButtonType {
  button = 'button',
  submit = 'submit',
}

export interface ButtonProps {
  title: string;
  customStyles?: Record<string, any>;
  customVariant: ButtonVariant;
  color: ButtonColor;
  buttonType: ButtonType;
  handleClick?: () => void;
}
