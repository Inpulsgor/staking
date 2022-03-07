import { FC } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { NotificationPopupProps } from './NotificationPopup.types';

const NotificationPopup: FC<NotificationPopupProps> = ({
  alertState,
  onAlertClose,
}) => (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={alertState.open}
    autoHideDuration={4000}
    onClose={onAlertClose}
  >
    <Alert
      onClose={onAlertClose}
      severity={alertState.severity}
      variant="filled"
    >
      {alertState.message}
    </Alert>
  </Snackbar>
);

export default NotificationPopup;
