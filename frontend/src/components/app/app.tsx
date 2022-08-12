import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route } from 'components/common/common';
import { Auth } from 'components/auth/auth';
import { Studio, StudioAnalystics } from '../studio';

const App: FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.ROOT} element="Root" />
      <Route path={AppRoute.SIGN_UP} element={<Auth />} />
      <Route path={AppRoute.SIGN_IN} element={<Auth />} />
      <Route path={AppRoute.STUDIO} element={<Studio />} />
      <Route path={AppRoute.ANALYSTICS} element={<StudioAnalystics />} />
    </Routes>
  );
};

export { App };
