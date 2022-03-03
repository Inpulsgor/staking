export interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}

export interface NotificationPopupProps {
  alertState: AlertState;
  onAlertClose: () => void;
}
