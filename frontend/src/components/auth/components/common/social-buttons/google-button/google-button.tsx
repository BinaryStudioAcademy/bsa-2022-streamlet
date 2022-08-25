import { Button } from 'components/common/common';
import { FC } from 'react';

import googleLogo from 'assets/img/google.svg';
import { ENV } from 'common/enums/enums';
import { getGoogleOAuthURL } from 'helpers/user';

import styles from './styles.module.scss';

const GoogleButton: FC<{ disabled: boolean }> = ({ disabled }) => {
  return (
    <a href={getGoogleOAuthURL(ENV.GOOGLE_CLIENT_ID as string)}>
      <Button
        className={styles['google-btn']}
        type="button"
        content={<img src={googleLogo} alt="Google" />}
        disabled={disabled}
      />
    </a>
  );
};

export { GoogleButton };
