import { FC } from 'react';
import { Box } from '@mui/material';

const AppWrapper: FC = ({ children }) => {
  return <Box component="main">{children}</Box>;
};

export default AppWrapper;
