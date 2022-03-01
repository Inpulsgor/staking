import { FC } from 'react';
import { Box, Button as MuiButton, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { PageContainer } from 'common/layout';
import { InfoItem, Button } from 'common/components';
import {
  ButtonColor,
  ButtonVariant,
} from 'common/components/Button/Button.types';
import { BorderColor } from 'common/components/InfoItem/InfoItem.types';
import { ReactComponent as ArrowLeftIcon } from 'assets/icons/left.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/icons/right.svg';
import account from 'common/static/account.json';
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
          <Box sx={styles.walletBox}>
            <Typography sx={styles.walletTitle} variant="body2">
              Your Wallet
            </Typography>
            <Box sx={styles.walletList}></Box>
          </Box>

          <Box sx={styles.buttonsBox}>
            <MuiButton sx={styles.arrowBtn}>
              <ArrowLeftIcon />
            </MuiButton>
            <MuiButton sx={styles.arrowBtn}>
              <ArrowRightIcon />
            </MuiButton>
          </Box>

          <Box sx={styles.vaultBox}>
            <Typography sx={styles.walletTitle} variant="body2">
              Your Vault
            </Typography>
            <Box sx={styles.walletList}></Box>
          </Box>
        </Box>

        <Box sx={styles.account} component="section">
          <Typography sx={styles.accountTitle}>
            Your Stacking Account
          </Typography>

          <Box sx={styles.accountInfo}>
            {account.items.map(({ label, value, id }) => (
              <InfoItem
                key={id}
                label={label}
                value={value}
                borderColor={BorderColor.light}
              />
            ))}
          </Box>
        </Box>

        <Box sx={styles.rewards} component="section">
          <Box sx={styles.rewardItem}>
            <Typography sx={styles.rewardTitle}>Reward A</Typography>
            <Box sx={styles.rewardTable}>
              {account.items.map(({ label, value, id }) => (
                <InfoItem
                  key={id}
                  label={label}
                  value={value}
                  borderColor={BorderColor.dark}
                />
              ))}
            </Box>
          </Box>
          <Box sx={styles.rewardItem}>
            <Typography sx={styles.rewardTitle}>Reward B</Typography>
            <Box sx={styles.rewardTable}>
              {account.items.map(({ label, value, id }) => (
                <InfoItem
                  key={id}
                  label={label}
                  value={value}
                  borderColor={BorderColor.dark}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Button
          title="Refresh Account"
          color={ButtonColor.white}
          customStyles={styles.refreshBtn}
          customVariant={ButtonVariant.outlined}
        />
      </PageContainer>
    </>
  );
};

export default Home;
