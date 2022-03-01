const styles = {
  wallet: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    paddingTop: '48px',
    paddingBottm: '24px',
    marginBottom: '24px',
  },
  walletBox: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
  walletTitle: {
    mb: '16px',
  },
  walletList: {
    padding: '16px',
    background:
      'linear-gradient(90deg, rgba(251, 199, 212, 0.04) 0%, rgba(151, 150, 240, 0.04) 100%), #191819',
    borderRadius: '8px',
    minHeight: '120px',
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: { xs: 'row', md: 'column' },
    justifyContent: 'center',
    alignItems: 'center',
    width: '32px',
    marginTop: { md: '32px' },
    gap: '16px',
  },
  arrowBtn: {
    padding: '0',
    minWidth: 'fit-content',
  },
  vaultBox: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
  },
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
    marginBottom: '48px',
    gap: '32px',
  },
  rewardItem: {
    width: { xs: '100%', md: '50%' },
  },
  rewardTable: {
    background:
      'linear-gradient(90deg, rgba(251, 199, 212, 0.04) 0%, rgba(151, 150, 240, 0.04) 100%), #191819',
    borderRadius: '8px',
    padding: '32px',
  },
  rewardTitle: {
    marginBottom: '16px',
    color: '#909090',
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
