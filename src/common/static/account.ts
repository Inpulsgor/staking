import { v4 as uuidv4 } from 'uuid';

export const initialAccount = [
  {
    id: uuidv4(),
    label: 'State',
    value: '',
  },
  {
    id: uuidv4(),
    label: 'Your identity:',
    value: '',
  },
  {
    id: uuidv4(),
    label: 'Associated vault:',
    value: '',
  },
  { id: uuidv4(), label: 'DiamondHands staked', value: 0 },
  { id: uuidv4(), label: 'Minimum staking ends', value: '' },
  { id: uuidv4(), label: 'Cooldown ends', value: '' },
];
