const styles = {
  account: {
    paddingTop: '24px',
    paddingBottom: '28px',
    maxWidth: '640px',
    width: '100%',
  },
  accountTitle: {
    lineHeight: '20px',
    marginBottom: { xs: '48px', md: '48px' },
  },
  accountInfo: {},
  rewards: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    marginBottom: { xs: '32px', md: '48px' },
    gap: '32px',
  },
  connectBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '48px',
    maxHeight: '56px',
  },
  refreshBtn: {
    border: '1px solid #fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    marginBottom: '48px',
    maxHeight: '56px',
    '&:hover': {
      border: '1px solid #fff' as const,
    },
  },
};

export default styles;
