import clsx from 'clsx';
import { Button } from 'components/common/common';
import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  isCurrentUserSubscribed: boolean;
  onSubscribeClick: () => void;
  hasUser: boolean;
  onUserUnauthenticated: () => void;
  isDisabled: boolean;
};

const SubscribeButton: FC<Props> = ({
  className,
  isCurrentUserSubscribed,
  onSubscribeClick,
  hasUser,
  isDisabled,
  onUserUnauthenticated,
}) => {
  const handleSubscribeClick = (): void => {
    if (!hasUser) {
      onUserUnauthenticated();
      return;
    }
    onSubscribeClick();
  };
  return (
    <Button
      content={isCurrentUserSubscribed ? 'Unsubscribe' : 'Subscribe'}
      className={clsx(className, styles['subscribe-btn'], { [styles['subscribed']]: isCurrentUserSubscribed })}
      onClick={handleSubscribeClick}
      disabled={isDisabled}
    />
  );
};

export { SubscribeButton };
