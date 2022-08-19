import { ErrorMessages } from 'common/enums/messages';
import { FC } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { useAppDispatch, useState, useNavigate, useAppSelector, useEffect } from 'hooks/hooks';
import { store } from 'store/store';
import { signIn } from 'store/auth/actions';
import { SignInForm, AuthContainer } from './components/components';
import { SignInFormValues } from './components/sign-in-form/sign-in-form';

const SignInPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => ({
    user: state.auth.user,
  }));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // if there is an error in store, it doesn't mean it's wanted on SignIn page
  // it could be from previous operations (SignUp)
  const [error, setError] = useState<string | undefined>(undefined);

  const hasUser = Boolean(user);

  const handleSignInSubmit = async (formValues: SignInFormValues): Promise<void> => {
    setError(undefined);
    try {
      setIsLoading(true);
      await dispatch(signIn(formValues)).unwrap();
    } catch {
      setError(store.getState().auth.error || ErrorMessages.DEFAULT);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasUser) {
      navigate(AppRoute.ROOT, { replace: true });
    }
  }, [hasUser, navigate]);

  return (
    <AuthContainer
      pageTitle="Login"
      className="sign-in"
      children={<SignInForm onSubmit={handleSignInSubmit} isLoading={isLoading} />}
      topLevelError={error}
    />
  );
};

export { SignInPage };
