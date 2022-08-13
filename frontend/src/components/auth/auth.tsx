import { AppRoute, DataStatus, errorMessages } from 'common/enums/enums';
import { UserSignUpRequestDto, FC } from 'common/types/types';
import { useAppDispatch, useAppSelector, useLocation } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { SignUpForm, AuthContainer, RestorePasswordForm } from './components/components';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.dataStatus);
  const error = useAppSelector((state) => state.auth.error);
  const { pathname } = useLocation();
  const handleRestorePasswordSubmit = (): void => {
    // handle restore password
  };

  const handleSignUpSubmit = (payload: UserSignUpRequestDto): void => {
    dispatch(authActions.signUp(payload));
  };

  const getScreen = (screen: string, topLevelError: string | undefined): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_UP: {
        return (
          <AuthContainer
            pageTitle="Sign up"
            className="sign-up"
            children={<SignUpForm onSubmit={handleSignUpSubmit} />}
            topLevelError={topLevelError}
          />
        );
      }
      case AppRoute.RESTORE_PASSWORD: {
        return (
          <AuthContainer
            pageTitle="Restore password"
            className="restore-password"
            children={<RestorePasswordForm onSubmit={handleRestorePasswordSubmit} />}
            topLevelError={topLevelError}
          />
        );
      }
    }

    return null;
  };
  const topLevelErrorMessage = status === DataStatus.REJECTED ? error || errorMessages.DEFAULT : undefined;
  return <>{getScreen(pathname, topLevelErrorMessage)}</>;
};

export { Auth };
