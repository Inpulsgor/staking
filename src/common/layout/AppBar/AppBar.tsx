import { FC } from 'react';
import { AppBar as AppHeading, Toolbar, Link, Typography } from '@mui/material';
import { ReactComponent as DiamondLogo } from 'assets/icons/diamond.svg';
import styles from './AppBar.styles';

const AppBar: FC = () => {
  return (
    <AppHeading sx={styles.header} position="static">
      <Toolbar sx={styles.toolbar}>
        <Link sx={styles.link} href="https://www.cprodiamond.io">
          <DiamondLogo width="26" />
          <Typography
            sx={styles.linkText}
            component="span"
            color="common.white"
          >
            Cprodiamonds.io
          </Typography>
        </Link>
      </Toolbar>
    </AppHeading>
  );
};

export default AppBar;
