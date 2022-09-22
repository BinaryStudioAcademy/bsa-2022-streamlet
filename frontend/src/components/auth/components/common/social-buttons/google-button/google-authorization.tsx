import { FC, useEffect } from 'react';

import { Loader } from 'components/common/common';
import { useAppDispatch, useCallback, useState, useNavigate, useAppSelector } from 'hooks/hooks';

import { AuthApiPath, ErrorMessage } from 'common/enums/enums';
import { googleAuthorization } from 'store/auth/actions';
import { store } from 'store/store';
import queryString from 'query-string';

const GoogleAuthorization: FC<{ query: string }> = ({ query }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { pathForBackToStreamVideo } = useAppSelector((state) => ({
    pathForBackToStreamVideo: state.auth.pathForBackToStreamVideo,
  }));

  const handleSignUpGoogle = useCallback(async (): Promise<void> => {
    setError(undefined);
    try {
      const q = queryString.parse(query);
      if (q.error) {
        setError('Error:' + q.error);
      } else {
        await dispatch(googleAuthorization({ code: q.code as string })).unwrap();
      }
    } catch {
      setError(store.getState().auth.error || ErrorMessage.DEFAULT);
    } finally {
      if (pathForBackToStreamVideo) {
        navigate(pathForBackToStreamVideo.replace('#', ''), { replace: true });
      } else {
        navigate(`${AuthApiPath.ROOT}`, { replace: true });
      }
    }
  }, [query, dispatch, navigate, pathForBackToStreamVideo]);

  useEffect(() => {
    handleSignUpGoogle();
  }, [handleSignUpGoogle]);

  return error ? <div>{error}</div> : <Loader spinnerSize="xs" />;
};

export { GoogleAuthorization };
