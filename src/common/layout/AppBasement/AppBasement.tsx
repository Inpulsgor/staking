import { FC } from 'react';
import { Box, Toolbar } from '@mui/material';
import { PageContainer } from 'common/layout';
import { Button } from 'common/components';
import { ButtonVariant } from 'common/components/Button/Button.types';
import styles from './AppBasement.styles';

const AppBasement: FC = () => {
  return (
    <Box sx={styles.footer} component="footer">
      <PageContainer>
        <Toolbar sx={styles.toolbar}>
          <Button
            title="Begin Staking"
            color=""
            variant={ButtonVariant.contained}
          />
          <Button
            title="Claim 0 A / 0 B"
            color=""
            variant={ButtonVariant.contained}
          />
        </Toolbar>
      </PageContainer>
    </Box>
  );
};

export default AppBasement;
