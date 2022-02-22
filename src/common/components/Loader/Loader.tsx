import { FC } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import styles from './Loader.styles';

interface LoaderProps {
  isLoading?: boolean;
}

const Loader: FC<LoaderProps> = ({ isLoading = false }) => {
  return (
    <Backdrop sx={styles.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
