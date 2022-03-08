const styles = {
  item: {
    display: 'flex',
    // flexDirection: { xs: 'column', md: 'row' },
    paddingBottom: '20px',
    marginBottom: '20px',
    gap: '16px',
    width: '100%',
  },
  labelHorizontal: {
    fontSize: { xs: '14px', md: '16px' },
    lineHeight: { xs: '14px', md: '16px' },
    maxWidth: '180px',
    width: '100%',
    color: '#D0D0D0',
  },
  labelVertical: {
    fontSize: { xs: '14px', md: '16px' },
    lineHeight: { xs: '14px', md: '16px' },
    maxWidth: '180px',
    width: '100%',
    color: '#D0D0D0',
  },
  labelNonBordered: {
    width: '100%',
  },
  value: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  light: {
    borderBottom: '1px solid #404040',
  },
  dark: {
    borderBottom: '1px solid #141414',
  },
};

export default styles;
