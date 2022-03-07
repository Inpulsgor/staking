import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { AppBar, AppWrapper, AppBasement } from 'common/layout';
import styles from './AppLayout.styles';

const AppLayout: FC = () => {
  return (
    <Box sx={styles.layout}>
      <AppBar />
      {/* <AppWrapper> */}
      <Outlet />
      {/* </AppWrapper> */}
      {/* <AppBasement /> */}
    </Box>
  );
};

export default AppLayout;
