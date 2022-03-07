import { FC, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { BN } from '@project-serum/anchor';
import { toBN } from '@gemworks/gem-farm-ts';
import { InfoItem } from 'common/components';
import { AccountProps } from './Account.types';
import { initialAccount } from 'common/static/account';
import { BorderColor } from 'common/components/InfoItem/InfoItem.types';
import styles from './Account.styles';

const Account: FC<AccountProps> = ({ farmerAcc, farmAcc }) => {
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

  return (
    <Box sx={styles.account} component="section">
      <Typography sx={styles.accountTitle}>Your Stacking Account</Typography>

      <Box sx={styles.accountInfo}>
        <InfoItem
          bordered={true}
          label="State"
          value={farmerAcc && parseFarmerState(farmerAcc)}
          borderColor={BorderColor.light}
        />
        <InfoItem
          bordered={true}
          label="Your identity:"
          value={farmerAcc?.identity?.toBase58()}
          borderColor={BorderColor.light}
        />
        <InfoItem
          bordered={true}
          label="Associated vault:"
          value={farmerAcc?.vault?.toBase58()}
          borderColor={BorderColor.light}
        />
        <InfoItem
          bordered={true}
          label="DiamondHands staked"
          value=""
          borderColor={BorderColor.light}
        />
        <InfoItem
          bordered={true}
          label="Minimum staking ends"
          value={farmerAcc && parseDate(farmerAcc?.minStakingEndsTs)}
          borderColor={BorderColor.light}
        />
        <InfoItem
          bordered={true}
          label="Cooldown ends"
          value={farmerAcc && parseDate(farmerAcc?.cooldownEndsTs)}
          borderColor={BorderColor.light}
        />
      </Box>
    </Box>
  );
};

export default Account;
