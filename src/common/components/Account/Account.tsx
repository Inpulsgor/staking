import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { InfoItem } from 'common/components';
import { AccountProps } from './Account.types';
import { initialAccount } from 'common/static/account';
import { BorderColor } from 'common/components/InfoItem/InfoItem.types';
import styles from './Account.styles';

const Account: FC<AccountProps> = () => {
  return (
    <Box sx={styles.account} component="section">
      <Typography sx={styles.accountTitle}>Your Stacking Account</Typography>

      <Box sx={styles.accountInfo}>
        {initialAccount.map(({ label, value, id }) => (
          <InfoItem
            key={id}
            bordered={true}
            label={label}
            value={value}
            borderColor={BorderColor.light}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Account;
