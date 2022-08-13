import { AppRoute, DataStatus, errorMessages } from 'common/enums/enums';
import { UserSignUpRequestDto, FC } from 'common/types/types';
import { useAppDispatch, useAppSelector, useLocation } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { signIn } from 'store/auth/actions';
import { SignUpForm, SignInForm, AuthContainer, RestorePasswordForm } from './components/components';
import { SignInFormValues } from './components/sign-in-form/sign-in-form';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.dataStatus);
  const error = useAppSelector((state) => state.auth.error);
  const { pathname } = useLocation();
  const handleRestorePasswordSubmit = (): void => {
    // handle restore password
  };

  const handleSignInSubmit = (formValues: SignInFormValues): void => {
    dispatch(signIn(formValues));
  };

  const handleSignUpSubmit = (payload: UserSignUpRequestDto): void => {
    dispatch(authActions.signUp(payload));
  };

  const getScreen = (screen: string, topLevelError: string | undefined): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return (
          <AuthContainer
            pageTitle="Login"
            className="sign-in"
            children={<SignInForm onSubmit={handleSignInSubmit} />}
            topLevelError={topLevelError}
          />
        );
      }
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
