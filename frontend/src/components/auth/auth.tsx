import { AppRoute } from 'common/enums/enums';
import { UserSignUpRequestDto, FC } from 'common/types/types';
import { useAppDispatch, useLocation } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { SignUpForm, SignInForm, Studio, AuthContainer, RestorePasswordForm } from './components/components';


const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const handleRestorePasswordSubmit = (): void => {
    // handle restore password
  };

  const handleSignInSubmit = (): void => {
    // handle sign in
  };

  const handleSignUpSubmit = (payload: UserSignUpRequestDto): void => {
    dispatch(authActions.signUp(payload));
  };

  const getScreen = (screen: string): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return (
          <AuthContainer
            pageTitle="Login"
            className="sign-in"
            children={<SignInForm onSubmit={handleSignInSubmit} />}
          />
        );
      }
      case AppRoute.SIGN_UP: {
        return (
          <AuthContainer
            pageTitle="Sign up"
            className="sign-up"
            children={<SignUpForm onSubmit={handleSignUpSubmit} />}
          />
        );
      }
      case AppRoute.RESTORE_PASSWORD: {
        return (
          <AuthContainer
            pageTitle="Restore password"
            className="restore-password"
            children={<RestorePasswordForm onSubmit={handleRestorePasswordSubmit} />}
          />
        );
      }
      case AppRoute.STUDIO: {
        return <Studio />;
      }
    }

    return null;
  };

  return <>{getScreen(pathname)}</>;
};

export { Auth };
