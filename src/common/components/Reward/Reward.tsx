import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BN } from '@project-serum/anchor';
import { toBN } from '@gemworks/gem-farm-ts';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { InfoItem } from 'common/components';
import { BorderColor } from 'common/components/InfoItem/InfoItem.types';
import { RewardProps } from './Reward.types';
// import { initialRewards } from 'common/static/rewards';
import styles from './Reward.styles';

const Reward: FC<RewardProps> = ({ rewardType, farmReward, reward }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const parseRewardType = (reward: any): string => {
  //   //returns "variable" or "fixed"
  //   return Object.keys(reward.rewardType)[0];
  // };

  const parseDate = (unixTsSec: number | string | BN) => {
    if (unixTsSec) {
      const unixBN = toBN(unixTsSec);

      if (unixBN.eq(new BN(0))) {
        return '--';
      }
    }
  };

  return (
    <Box sx={styles.rewardItem}>
      <Typography sx={styles.rewardTitle}>Reward {rewardType}</Typography>

      <Box sx={styles.rewardTable}>
        <InfoItem
          sub={null}
          bordered={true}
          label="Accrued reward:"
          value={reward?.accruedReward}
          borderColor={BorderColor.dark}
        />
        <InfoItem
          sub={null}
          bordered={true}
          label="Paid out reward:"
          value={reward?.paidOutReward}
          borderColor={BorderColor.dark}
        />
        <InfoItem
          sub={null}
          bordered={false}
          label="FIXED REWARD"
          value=""
          borderColor={BorderColor.dark}
        />
        <InfoItem
          sub={null}
          bordered={true}
          label="Staking begins:"
          value={parseDate(reward?.fixedRate?.beginStakingTs)}
          borderColor={BorderColor.dark}
        />
        <InfoItem
          sub={null}
          bordered={true}
          label="Schedule begins:"
          value={parseDate(reward?.fixedRate?.beginScheduleTs)}
          borderColor={BorderColor.dark}
        />
        <InfoItem
          sub={null}
          bordered={true}
          label="Last updated:"
          value={parseDate(reward?.fixedRate?.lastUpdatedTs)}
          borderColor={BorderColor.dark}
        />
        <InfoItem
          sub={null}
          bordered={true}
          label="Promised duration:"
          value={reward?.fixedRate?.promisedDuration}
          borderColor={BorderColor.dark}
        />
        <InfoItem
          sub={[
            {
              id: uuidv4(),
              label: 'Base rate:',
              value: reward?.fixedRate?.promisedSchedule?.baseRate,
            },
            {
              id: uuidv4(),
              label: 'Denominator:',
              value: reward?.fixedRate?.promisedSchedule?.denominator,
            },
          ]}
          bordered={false}
          label="Promised schedule:"
          value=""
          borderColor={BorderColor.dark}
        />
      </Box>
    </Box>
  );
};

export default Reward;
