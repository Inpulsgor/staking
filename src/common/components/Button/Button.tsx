import { FC } from 'react';
import { Button as MuiButton, Typography } from '@mui/material';
import { ButtonProps, ButtonVariant } from './Button.types';
import styles from './Button.styles';

const Button: FC<ButtonProps> = ({
  title,
  customStyles,
  customVariant,
  color = 'common.white',
}) => {
  return (
    <MuiButton
      sx={{ ...styles.btn, ...customStyles }}
      variant={customVariant ? customVariant : ButtonVariant.contained}
    >
      <Typography component="span" color={color}>
        {title}
      </Typography>
    </MuiButton>
  );
};

export default Button;
