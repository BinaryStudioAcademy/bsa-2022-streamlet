import React, { FC } from 'react';
import { Button, Loader } from 'components/common/common';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  isLoading: boolean;
  // if button is disabled, it doesn't necessarily mean it's loading
  // we might have clicked, e.g. google button
  // and while we load, the usual auth button is disabled
  // but we didn't click auth button, so it makes no sense for there to be a spinner
  // so it's two different properties here, for flexibility
  disabled: boolean;
  name: string;
  className?: string;
};

const AuthSubmitButton: FC<Props> = ({ isLoading, name, disabled, className }) => {
  return (
    <Button
      className={clsx(styles['auth-submit-btn'], isLoading && styles['no-hover'], className)}
      type="submit"
      content={isLoading ? <Loader spinnerSize="25px" vCentered={false} color="white" /> : name}
      disabled={disabled}
    />
  );
};

export { AuthSubmitButton };
