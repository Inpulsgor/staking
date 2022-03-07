import { FC } from 'react';
import { Button as MuiButton, Typography } from '@mui/material';
import { ButtonProps, ButtonVariant, ButtonType } from './Button.types';
import styles from './Button.styles';

const Button: FC<ButtonProps> = ({
  title,
  buttonType = ButtonType.button,
  customStyles,
  customVariant,
  handleClick,
  color,
}) => {
  return (
    <MuiButton
      type={buttonType}
      sx={{ ...styles.btn, ...customStyles }}
      variant={customVariant ? customVariant : ButtonVariant.contained}
      onClick={handleClick}
    >
      <Typography component="span" variant="body2" color={color}>
        {title}
      </Typography>
    </MuiButton>
  );
};

export default Button;
