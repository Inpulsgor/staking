import { FC } from 'react';
import { Box, Toolbar, Typography, TextField } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { PageContainer } from 'common/layout';
import { Button, ConnectFarm } from 'common/components';
import { useSticky } from 'common/hooks/useSticky';
import { ButtonColor } from 'common/components/Button/Button.types';
import { ButtonVariant } from 'common/components/Button/Button.types';
import styles from './AppBasement.styles';

const AppBasement: FC = () => {
  const wallet = useWallet();
  const { sticky } = useSticky();

  return (
    <Box sx={sticky ? styles.footerSticky : styles.footer} component="footer">
      <PageContainer>
        <Toolbar
          sx={styles.toolbar}
          style={{
            border: sticky ? 'none' : '',
          }}
        >
          {!wallet.connected && (
            <WalletDialogButton sx={styles.walletBtn} fullWidth>
              <Typography variant="body1">Connect Wallet</Typography>
            </WalletDialogButton>
          )}

          {wallet.connected && <ConnectFarm />}

          {wallet.connected && (
            <>
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
            </>
          )}
        </Toolbar>
      </PageContainer>
    </Box>
  );
};

export default AppBasement;
