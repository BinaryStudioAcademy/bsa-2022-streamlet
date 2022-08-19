import { ErrorMessages } from 'common/enums/messages';
import { FC, UserSignUpRequestDto } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { useAppDispatch, useState, useNavigate, useAppSelector, useEffect } from 'hooks/hooks';
import { store } from 'store/store';
import { signUp } from 'store/auth/actions';
import { AuthContainer, SignUpForm } from './components/components';

const SignUpPage: FC = () => {
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

  const handleSignUpSubmit = async (formValues: UserSignUpRequestDto): Promise<void> => {
    setError(undefined);
    try {
      setIsLoading(true);
      await dispatch(signUp(formValues)).unwrap();
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
      pageTitle="Sign up"
      className="sign-up"
      children={<SignUpForm onSubmit={handleSignUpSubmit} isLoading={isLoading} />}
      topLevelError={error}
    />
  );
};

export { SignUpPage };
