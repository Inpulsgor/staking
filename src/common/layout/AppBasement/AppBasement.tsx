import { FC, useState } from 'react';
import { Box, Toolbar, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { PageContainer } from 'common/layout';
import { Button, ConnectFarm } from 'common/components';
import { useSticky } from 'common/hooks/useSticky';
import { ButtonColor } from 'common/components/Button/Button.types';
import {
  ButtonVariant,
  ButtonType,
} from 'common/components/Button/Button.types';
import { AppBasementProps } from './AppBasement.types';
import styles from './AppBasement.styles';

const AppBasement: FC<AppBasementProps> = ({
  initFarmer,
  setfarmAddress,
  beginStaking,
  availableA,
  availableB,
  farmerAcc,
}) => {
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

          {wallet.connected && (
            <ConnectFarm
              setfarmAddress={setfarmAddress}
              initFarmer={initFarmer}
            />
          )}

          {wallet.connected && farmerAcc && (
            <>
              <Button
                title="Begin Staking"
                color={ButtonColor.black}
                buttonType={ButtonType.button}
                customVariant={ButtonVariant.contained}
                customStyles={styles.stakingBtn}
                handleClick={beginStaking}
              />
              <Button
                title={`Claim ${availableA} A / ${availableB} B`}
                color={ButtonColor.black}
                buttonType={ButtonType.button}
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
