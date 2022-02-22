import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from 'common/components';
import { HomePage, NotFoundPage } from './routes';
import { ROUTES } from 'types/enum';

const App: FC = () => {
  return (
    <Suspense fallback={<Loader isLoading />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
