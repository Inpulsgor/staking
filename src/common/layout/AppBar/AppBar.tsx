import { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar as AppHeading,
  Toolbar,
  Button,
  Typography,
} from '@mui/material';
import { ReactComponent as DiamondLogo } from 'assets/icons/diamond.svg';
import { ROUTES } from 'types/enum';
import styles from './AppBar.styles';
import external from 'common/static/external.json';

const AppBar: FC = () => {
  return (
    <AppHeading sx={styles.header} position="static">
      <Toolbar sx={styles.toolbar}>
        <Button component={Link} to={ROUTES.HOME}>
          <DiamondLogo />
          <Typography component="span" color="common.white">
            Cprodiamonds.io
          </Typography>
        </Button>
      </Toolbar>
    </AppHeading>
  );
};

export default AppBar;
