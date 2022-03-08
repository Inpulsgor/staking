const styles = {
  form: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    width: '100%',
  },
  textField: {
    border: '1px solid #404040',
    maxHeight: '56px',
    color: '#fff',
  },
  button: {
    marginTop: { xs: '16px', md: '0' } as const,
    marginLeft: { xs: '0', md: '8px' },
    maxWidth: { xs: '100%', md: '200px' },
    background: 'linear-gradient(90deg, #FBC7D4 0%, #9796F0 100%), #4AAF47',
  },
};

export default styles;
