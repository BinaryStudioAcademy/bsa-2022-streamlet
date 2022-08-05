import { AppRoute } from 'common/enums/enums';
import { UserSignUpRequestDto, FC } from 'common/types/types';
import { useAppDispatch, useLocation } from 'hooks/hooks';
import { authActions } from 'store/actions';
import { SignUpForm, SignInForm } from './components/components';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleSignInSubmit = (): void => {
    // handle sign in
  };

  const handleSignUpSubmit = (payload: UserSignUpRequestDto): void => {
    dispatch(authActions.signUp(payload));
  };

  const getScreen = (screen: string): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return <>{getScreen(pathname)}</>;
};

export { Auth };
