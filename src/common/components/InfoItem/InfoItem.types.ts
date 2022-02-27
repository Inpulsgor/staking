export enum BorderColor {
  dark = 'dark',
  light = 'light',
}

export interface InfoItemProps {
  label: string;
  value: string;
  borderColor: BorderColor;
}
