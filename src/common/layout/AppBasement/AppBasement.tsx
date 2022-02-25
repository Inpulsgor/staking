import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { ReactComponent as Logo } from 'assets/icons/diamond.svg';
import { ROUTES } from 'types/enum';
import styles from './AppBasement.styles';

const AppBasement: FC = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate(ROUTES.HOME);

  return (
    <Box sx={styles.footer} component="footer">
      <Toolbar sx={styles.toolbar}>
        <IconButton
          onClick={handleClick}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <Logo width="40" />
        </IconButton>
        <Typography sx={styles.copyright} variant="body2">
          Diamond Hands NFT, a collaboration between Cryptonary and DC LLC. All
          rights reserved.
        </Typography>
        <Button href="/" target="_blank" rel="noopener">
          <Typography sx={styles.terms} variant="body2">
            Terms {'&'} Conditions
          </Typography>
        </Button>
      </Toolbar>
    </Box>
  );
};

export default AppBasement;
