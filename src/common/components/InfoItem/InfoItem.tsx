import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { InfoItemProps, BorderColor } from './InfoItem.types';
import styles from './InfoItem.styles';

const InfoItem: FC<InfoItemProps> = ({
  label,
  value,
  bordered,
  sub,
  borderColor = BorderColor.light,
}) => {
  const getValue = () => {
    if (value && typeof value === 'string') return value;
    if (typeof value === 'number') return value;

    return '--';
  };

  const borderStyles = styles[borderColor] || '';
  const showValue = getValue();

  return (
    <Box
      sx={{
        ...styles.item,
        border: bordered ? borderStyles : '',
        paddingBottom: bordered ? '20px' : '0',
      }}
    >
      {!bordered && !sub ? (
        <Typography
          sx={{ ...styles.labelNonBordered, color: '#909090' }}
          variant="body2"
        >
          {label}
        </Typography>
      ) : (
        <>
          <Typography sx={styles.label} variant="body2">
            {label}
          </Typography>

          <Typography sx={styles.value} variant="body2">
            {showValue}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default InfoItem;
