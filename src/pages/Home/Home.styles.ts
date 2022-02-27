const styles = {
  wallet: {
    display: 'flex',
    paddingTop: '48px',
    paddingBottm: '24px',
  },
  account: {
    paddingTop: '24px',
    paddingBottom: '28px',
    maxWidth: '640px',
    width: '100%',
  },
  accountTitle: {
    lineHeight: '20px',
    marginBottom: { md: '48px' },
  },
  accountInfo: {},
  rewards: {
    display: 'flex',
    marginBottom: '48px',
    gap: '32px',
  },
  rewardItem: {
    width: '50%',
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
    display: 'block',
    margin: '0 auto',
    marginBottom: '48px',
    '&:hover': {
      border: '1px solid #fff' as const,
    },
  },
};

export default styles;
