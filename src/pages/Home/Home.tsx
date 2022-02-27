import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { PageContainer } from 'common/layout';
import styles from './Home.styles';

const Home: FC = () => {
  return (
    <>
      <Helmet>
        <title>Stacking</title>
        <meta name="description" content="Stacking" />
      </Helmet>

      <PageContainer>
        <Box sx={styles.wallet} component="section">
          <Box>
            <Typography>Your Wallet</Typography>
            <Box></Box>
          </Box>
          <Box>
            <Button>left</Button>
            <Button>right</Button>
          </Box>
          <Box>
            <Typography>Your Vault</Typography>
            <Box></Box>
          </Box>
        </Box>

        <Box sx={styles.account} component="section">
          <Typography sx={styles.accountTitle}>
            Your Stacking Account
          </Typography>
          <Box sx={styles.accountInfo}></Box>
        </Box>

        <Box sx={styles.rewards} component="section"></Box>
      </PageContainer>
    </>
  );
};

export default Home;
