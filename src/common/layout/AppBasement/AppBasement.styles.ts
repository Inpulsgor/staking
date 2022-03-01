const styles = {
  footer: {
    // position: 'fixed' as const,
    display: 'flex',
    justifyContent: { xs: 'center', md: 'start' },
    bgcolor: 'custom.black',
    paddingBottom: { md: '40px' },
    // bottom: '0',
    // left: '0',
    width: '100%',
  },
  toolbar: {
    height: '100%',
    padding: { xs: '16px', md: '48px 0 0' },
    borderTop: '1px solid #404040',
  },
  copyright: {
    flexGrow: 1,
    textAlign: 'center',
    color: 'custom.mercury',
  },
  terms: {
    textTransform: 'none',
    color: 'custom.white',
  },
  stakingBtn: {
    background:
      'linear-gradient(192.54deg, #9BE15D 2.01%, #00E3AE 97.9%), linear-gradient(90deg, #FBC7D4 0%, #9796F0 100%), #4AAF47',
    marginRight: '16px',
  },
  cliamgBtn: {
    background: 'linear-gradient(90deg, #FBC7D4 0%, #9796F0 100%), #4AAF47',
  },
};

export default styles;
