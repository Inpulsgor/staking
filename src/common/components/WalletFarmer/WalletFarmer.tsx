import { FC } from 'react';
import { Box, Button as MuiButton, Typography, Modal } from '@mui/material';

import { ReactComponent as ArrowLeftIcon } from 'assets/icons/left.svg';
import { ReactComponent as ArrowRightIcon } from 'assets/icons/right.svg';
import { WalletProps } from './WalletFarmer.types';
import styles from './WalletFarmer.styles';

const WalletFarmer: FC<WalletProps> = () => {
  return (
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
  );
};

export default WalletFarmer;
