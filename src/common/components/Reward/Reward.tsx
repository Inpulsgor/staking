import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { InfoItem } from 'common/components';
import { BorderColor } from 'common/components/InfoItem/InfoItem.types';
import { RewardProps } from './Reward.types';
import { initialRewards } from 'common/static/rewards';
import styles from './Reward.styles';

const Reward: FC<RewardProps> = ({ rewardType }) => {
  return (
    <Box sx={styles.rewardItem}>
      <Typography sx={styles.rewardTitle}>Reward {rewardType}</Typography>

      <Box sx={styles.rewardTable}>
        {initialRewards.map(({ id, bordered, label, value, sub }) => (
          <InfoItem
            key={id}
            sub={sub}
            bordered={bordered}
            label={label}
            value={value}
            borderColor={BorderColor.dark}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Reward;
