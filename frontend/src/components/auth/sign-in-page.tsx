import { AppRoutes, ErrorMessage } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { useAppDispatch, useState, useNavigate, useAppSelector, useEffect } from 'hooks/hooks';
import { store } from 'store/store';
import { signIn } from 'store/auth/actions';
import { SignInForm, AuthContainer } from './components/components';
import { SignInFormValues } from './components/sign-in-form/sign-in-form';
import { ErrorBox } from 'components/common/errors/errors';
import { errorCodes } from 'exceptions/exceptions';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
  const errorCode = useAppSelector((state) => state.auth.errorCode);

  const hasUser = Boolean(user);

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

  useEffect(() => {
    if (hasUser) {
      navigate(AppRoutes.ROOT, { replace: true });
    }
  }, [hasUser, navigate]);

  const getErrorDisplay = (error: string): ReactNode => {
    return (
      <>
        {error}
        {errorCode === errorCodes.auth.signIn.UNVERIFIED && (
          <>
            <br />
            <Link to={AppRoutes.ACCOUNT_VERIFICATION_INIT}>Receive the letter again?</Link>
          </>
        )}
      </>
    );
  };

  return (
    <AuthContainer
      pageTitle="Sign in"
      className="sign-in"
      children={<SignInForm onSubmit={handleSignInSubmit} isLoading={isLoading} />}
      topLevelErrorComponent={error && <ErrorBox message={getErrorDisplay(error)} />}
    />
  );
};

export { SignInPage };
