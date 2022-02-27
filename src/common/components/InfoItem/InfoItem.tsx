import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { InfoItemProps, BorderColor } from './InfoItem.types';
import styles from './InfoItem.styles';

const InfoItem: FC<InfoItemProps> = ({
  label,
  value,
  borderColor = BorderColor.light,
}) => {
  const borderStyles = styles[borderColor];

  return (
    <Box sx={{ ...styles.item, border: borderStyles }}>
      <Typography sx={styles.label} variant="body2">
        {label}
      </Typography>
      <Typography sx={styles.value} variant="body2">
        {value}
      </Typography>
    </Box>
  );
};

export default InfoItem;
