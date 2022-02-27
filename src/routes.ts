import { FunctionComponent, lazy } from 'react';
import { ROUTES } from 'types/enum';

export const HomePage = lazy(
  () => import('pages/Home/Home' /* webpackChunkName: "HomePage" */),
);

export const NotFoundPage = lazy(
  () =>
    import('pages/NotFound/NotFound' /* webpackChunkName: "NotFoundPage" */),
);

interface Routes {
  path: ROUTES;
  component: FunctionComponent;
}

export const routes: Array<Routes> = [
  {
    path: ROUTES.HOME,
    component: HomePage,
  },
  {
    path: ROUTES.NOT_FOUND,
    component: NotFoundPage,
  },
];
