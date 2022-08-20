import { ErrorMessage } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { useAppDispatch, useState } from 'hooks/hooks';
import { store } from 'store/store';
import { signIn } from 'store/auth/actions';
import { SignInForm, AuthContainer } from './components/components';
import { SignInFormValues } from './components/sign-in-form/sign-in-form';

const SignInPage: FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // if there is an error in store, it doesn't mean it's wanted on SignIn page
  // it could be from previous operations (SignUp)
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSignInSubmit = async (formValues: SignInFormValues): Promise<void> => {
    setError(undefined);
    try {
      setIsLoading(true);
      await dispatch(signIn(formValues)).unwrap();
    } catch {
      setError(store.getState().auth.error || ErrorMessage.DEFAULT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer
      pageTitle="Sign in"
      className="sign-in"
      children={<SignInForm onSubmit={handleSignInSubmit} isLoading={isLoading} />}
      topLevelError={error}
    />
  );
};

export { SignInPage };
