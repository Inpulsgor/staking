const styles = {
  footer: {
    maxHeight: { md: '100px' },
    bgcolor: 'custom.black',
  },
  toolbar: {
    display: 'flex',
    justifyContent: { xs: 'center', md: 'start' },
    flexWrap: { xs: 'wrap', md: 'nowrap' },
    height: '100%',
    padding: { xs: '16px', md: '30px' },
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
};

export default styles;
