import clsx from 'clsx';
import { FC } from 'react';

import { Button, Loader } from 'components/common/common';
import { useCallback, useAppDispatch, useState } from 'hooks/hooks';

import googleLogo from 'assets/img/google.svg';
import { ErrorMessage } from 'common/enums/enums';
import { signInGoogle } from 'store/auth/actions';
import { store } from 'store/store';

import styles from './styles.module.scss';

const GoogleButton: FC<{ disabled: boolean }> = ({ disabled }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSignUpGoogle = useCallback(async (): Promise<void> => {
    setError(undefined);
    try {
      setIsLoading(true);
      await dispatch(signInGoogle())
        .unwrap()
        .then((data) => window.location.replace(data.url));
    } catch {
      setError(store.getState().auth.error || ErrorMessage.DEFAULT);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return (
    <>
      <span className={clsx(styles['messages'])}>{error}</span>
      <Button
        onClick={handleSignUpGoogle}
        className={clsx(styles['google-btn'])}
        type="button"
        content={isLoading ? <Loader spinnerSize="xs" vCentered={false} /> : <img src={googleLogo} alt="Google" />}
        disabled={disabled}
      />
    </>
  );
};

export { GoogleButton };
