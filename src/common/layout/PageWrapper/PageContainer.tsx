import { FC } from 'react';
import { Container } from '@mui/material';
import styles from './PageContainer.styles';

const PageContainer: FC = ({ children }) => (
  <Container sx={styles.container} maxWidth="xl" disableGutters>
    {children}
  </Container>
);

export default PageContainer;
