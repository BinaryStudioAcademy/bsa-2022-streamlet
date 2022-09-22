import { AppRoutes, ErrorMessage } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { useAppDispatch, useState, useNavigate, useAppSelector, useEffect, useLocation } from 'hooks/hooks';
import { store } from 'store/store';
import { setPathForBackToStreamVideo, signIn } from 'store/auth/actions';
import { SignInForm, AuthContainer } from './components/components';
import { SignInFormValues } from './components/sign-in-form/sign-in-form';
import { ErrorBox } from 'components/common/errors/errors';
import { ErrorDisplayWithCode } from './components/error-display-with-code/error-display-with-code';

const SignInPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, pathForBackToVideo } = useAppSelector((state) => ({
    user: state.auth.user,
    pathForBackToVideo: state.auth.pathForBackToStreamVideo,
  }));
  const { hash } = useLocation();

  useEffect(() => {
    if (!pathForBackToVideo) {
      dispatch(setPathForBackToStreamVideo(hash || null));
    }
  }, [hash, dispatch, pathForBackToVideo]);

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
    if (hasUser && pathForBackToVideo) {
      navigate(pathForBackToVideo.replace('#', ''));
    } else if (hasUser && !pathForBackToVideo) {
      navigate(AppRoutes.ROOT, { replace: true });
    }
  }, [hasUser, navigate, dispatch, pathForBackToVideo]);

  return (
    <AuthContainer
      pageTitle="Sign in"
      className="sign-in"
      children={<SignInForm onSubmit={handleSignInSubmit} isLoading={isLoading} />}
      topLevelErrorComponent={
        error && <ErrorBox message={<ErrorDisplayWithCode message={error} errorCode={errorCode} />} />
      }
    />
  );
};

export { SignInPage };
