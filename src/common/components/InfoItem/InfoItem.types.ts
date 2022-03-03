export enum BorderColor {
  dark = 'dark',
  light = 'light',
}

interface Sub {
  id: string;
  label: string;
  value: string;
}

export interface InfoItemProps {
  label: string;
  value: string | number;
  bordered?: boolean;
  borderColor: BorderColor;
  sub?: Array<Sub> | null;
}
