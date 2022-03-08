import { BN } from '@project-serum/anchor';

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
  value: number | string | BN | undefined;
  bordered?: boolean;
  borderColor: BorderColor;
  sub?: Array<Sub> | null;
  orientation?: 'horizontal' | 'vertical';
}
