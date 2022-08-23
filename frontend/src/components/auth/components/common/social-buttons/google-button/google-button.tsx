// import { Button } from 'components/common/common';
import { FC, useRef } from 'react';
// import googleLogo from 'assets/img/google.svg';
import styles from './styles.module.scss';
import { useEffect, useCallback } from 'hooks/hooks';
import { ENV } from 'common/enums/enums';
import jwt_deocde from 'jwt-decode';
import clsx from 'clsx';

interface CredentialResponse {
  credential: string;
  select_by: string;
}

const handleCallbackResponse = (tokenResponse = {} as CredentialResponse): void => {
  const userObject = jwt_deocde(tokenResponse.credential);
  alert('Encoded JWT ID token ' + userObject);
};

const GoogleButton: FC = () => {
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const ititializeGoogle = useCallback((): void => {
    google.accounts.id.initialize({
      client_id: ENV.GOOGLE_CLIENT_ID as string,
      callback: handleCallbackResponse,
      auto_select: false,
    });

    google.accounts.id.renderButton(googleButtonRef.current as HTMLElement, {
      type: 'standard',
      size: 'large',
      text: 'signin',
      width: '400px',
      locale: 'en',
    });
  }, []);

  useEffect(() => {
    ititializeGoogle();
  }, [ititializeGoogle]);

  return (
    <div className={clsx(styles['google-btn'])} onClick={(): void => handleCallbackResponse()} ref={googleButtonRef} />
  );
};

export { GoogleButton };
