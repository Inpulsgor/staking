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
  vaultBox: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
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
};

export default styles;
