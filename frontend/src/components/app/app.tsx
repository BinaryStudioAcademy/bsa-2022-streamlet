import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route } from 'components/common/common';
import { Auth } from 'components/auth/auth';
import { NotFound } from '../not-found-page/not-found';
import { ConfirmationModalTest } from './tests/confirmation-modal/confirmation-modal';
import { MainPage } from 'pages/main-page';
import { MainLayout } from 'layouts/main-layout/main-layout';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path={AppRoute.ROOT} element={<MainLayout component={MainPage} />} />
        <Route path="/asd" element={<MainLayout component={MainPage} />} />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route path={AppRoute.RESTORE_PASSWORD} element={<Auth />} />
        <Route path={AppRoute.ANY} element={<NotFound />} />
        <Route path={'test/confirmationModal/'} element={<ConfirmationModalTest />} />
      </Routes>
    </>
  );
};

export { App };
