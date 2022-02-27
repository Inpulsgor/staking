import { FC } from 'react';
import { Box, Toolbar } from '@mui/material';
import { PageContainer } from 'common/layout';
import { Button } from 'common/components';
import { ButtonColor } from 'common/components/Button/Button.types';
import { ButtonVariant } from 'common/components/Button/Button.types';
import styles from './AppBasement.styles';

const AppBasement: FC = () => {
  return (
    <Box sx={styles.footer} component="footer">
      <PageContainer>
        <Toolbar sx={styles.toolbar}>
          <Button
            title="Begin Staking"
            color={ButtonColor.black}
            customVariant={ButtonVariant.contained}
            customStyles={styles.stakingBtn}
          />
          <Button
            title="Claim 0 A / 0 B"
            color={ButtonColor.black}
            customVariant={ButtonVariant.contained}
            customStyles={styles.cliamgBtn}
          />
        </Toolbar>
      </PageContainer>
    </Box>
  );
};

export default AppBasement;
