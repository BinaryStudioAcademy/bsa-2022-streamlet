import { Button } from 'components/common/common';
import React, { FC } from 'react';
import googleLogo from 'assets/img/google.svg';
import styles from './styles.module.scss';

const GoogleButton: FC<{ disabled: boolean }> = ({ disabled }) => {
  return (
    <Button
      className={styles['google-btn']}
      type="button"
      content={<img src={googleLogo} alt="Google" />}
      disabled={disabled}
    />
  );
};

export { GoogleButton };
