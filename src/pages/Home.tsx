import { FC } from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { PageContainer } from 'common/layout';

const Home: FC = () => {
  return (
    <>
      <Helmet>
        <title>Stacking</title>
        <meta name="description" content="Stacking" />
      </Helmet>

      <PageContainer>Stacking</PageContainer>
    </>
  );
};

export default Home;
