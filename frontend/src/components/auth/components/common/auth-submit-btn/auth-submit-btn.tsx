import React, { FC } from 'react';
import { Button, Loader } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  isLoading: boolean;
  // if button is disabled, it doesn't necessarily mean it's loading
  // we might have clicked, e.g. google button
  // and while we load, the usual auth button is disabled
  // but we didn't click auth button, so it makes no sense for there to be a spinner
  // so it's two different properties here, for flexibility
  disabled: boolean;
  name: string;
};

const AuthSubmitButton: FC<Props> = ({ isLoading, name, disabled }) => {
  return (
    <Button
      className={styles['auth-submit-btn']}
      type="submit"
      content={isLoading ? <Loader spinnerSize="25px" vCentered={false} /> : name}
      disabled={disabled}
    />
  );
};

export { AuthSubmitButton };
