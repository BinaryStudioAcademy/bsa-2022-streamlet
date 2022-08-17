import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route, HeaderContainer } from 'components/common/common';
import { Search } from 'components/search/search';
import { NotFound } from '../not-found-page/not-found';
import { ConfirmationModalTest } from './tests/confirmation-modal/confirmation-modal';
import { RestorePasswordPage, SignInPage, SignUpPage } from 'components/auth/auth';
import { MainPage } from 'pages/main-page';
import { ProfilePreferencesPage } from '../profile-preferences-page/profile-preferences-page';

const App: FC = () => {
  return (
    <>
      <HeaderContainer />
      <Routes>
        <Route path={AppRoute.SIGN_UP} element={<SignUpPage />} />
        <Route path={AppRoute.SIGN_IN} element={<SignInPage />} />
        <Route path={AppRoute.RESTORE_PASSWORD} element={<RestorePasswordPage />} />
        <Route path={AppRoute.ROOT} element={<MainPage />} />
        <Route path={AppRoute.SEARCH} element={<Search />} />
        <Route path={AppRoute.ANY} element={<NotFound />} />
        <Route path={'test/confirmationModal/'} element={<ConfirmationModalTest />} />
        <Route path={'preference_page'} element={<ProfilePreferencesPage />} />
      </Routes>
    </>
  );
};

export { App };
