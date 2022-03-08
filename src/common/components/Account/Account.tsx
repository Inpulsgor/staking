import { FC, useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { BN } from '@project-serum/anchor';
import { toBN } from '@gemworks/gem-farm-ts';
import { InfoItem } from 'common/components';
import { AccountProps } from './Account.types';
import { BorderColor } from 'common/components/InfoItem/InfoItem.types';
import styles from './Account.styles';

const Account: FC<AccountProps> = ({ farmerAcc, farmAcc }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const parseFarmerState = (farmer: any): string => {
    return Object.keys(farmer.state)[0];
  };

  const parseDate = (unixTsSec: number | string | BN) => {
    const unixBN = toBN(unixTsSec);

    if (unixBN.eq(new BN(0))) {
      return '--';
    }
  };

  // useEffect(() => {
  //   console.log('farmAcc ----->', farmAcc);
  //   console.log('farmerAcc ----->', farmerAcc);
  // }, [farmAcc, farmerAcc]);

  const orientation = isMobile ? 'vertical' : 'horizontal';

  return (
    <Box sx={styles.account} component="section">
      <Typography sx={styles.accountTitle}>Your Stacking Account</Typography>

      <Box sx={styles.accountInfo}>
        <InfoItem
          bordered={true}
          orientation="horizontal"
          label="State"
          value={farmerAcc && parseFarmerState(farmerAcc)}
          borderColor={BorderColor.light}
        />
        <InfoItem
          bordered={true}
          orientation={orientation}
          label="Your identity:"
          value={farmerAcc?.identity?.toBase58()}
          borderColor={BorderColor.light}
        />
        <InfoItem
          bordered={true}
          orientation={orientation}
          label="Associated vault:"
          value={farmerAcc?.vault?.toBase58()}
          borderColor={BorderColor.light}
        />
        <InfoItem
          bordered={true}
          orientation="horizontal"
          label="DiamondHands staked"
          value=""
          borderColor={BorderColor.light}
        />
        <InfoItem
          bordered={true}
          orientation="horizontal"
          label="Minimum staking ends"
          value={farmerAcc && parseDate(farmerAcc?.minStakingEndsTs)}
          borderColor={BorderColor.light}
        />
        <InfoItem
          bordered={false}
          orientation="horizontal"
          sub={[]}
          label="Cooldown ends"
          value={farmerAcc && parseDate(farmerAcc?.cooldownEndsTs)}
          borderColor={BorderColor.light}
        />
      </Box>
    </Box>
  );
};

export default Account;
