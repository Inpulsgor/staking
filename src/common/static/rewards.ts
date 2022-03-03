import { v4 as uuidv4 } from 'uuid';

export const initialRewards = [
  {
    id: uuidv4(),
    label: 'Accrued reward:',
    value: '',
    bordered: true,
    sub: null,
  },
  {
    id: uuidv4(),
    label: 'Paid out reward:',
    value: '',
    bordered: true,
    sub: null,
  },
  {
    id: uuidv4(),
    label: 'FIXED REWARD',
    value: '',
    bordered: false,
    sub: null,
  },
  {
    id: uuidv4(),
    label: 'Staking begins:',
    value: '',
    bordered: true,
    sub: null,
  },
  {
    id: uuidv4(),
    label: 'Schedule begins:',
    value: '',
    bordered: true,
    sub: null,
  },
  {
    id: uuidv4(),
    label: 'Last updated:',
    value: '',
    bordered: true,
    sub: null,
  },
  {
    id: uuidv4(),
    label: 'Promised duration:',
    value: '',
    bordered: true,
    sub: null,
  },
  {
    id: uuidv4(),
    label: 'Promised schedule:',
    value: '',
    bordered: false,
    sub: [
      { id: uuidv4(), label: 'Base rate:', value: '' },
      { id: uuidv4(), label: 'Denominator:', value: '' },
    ],
  },
];
