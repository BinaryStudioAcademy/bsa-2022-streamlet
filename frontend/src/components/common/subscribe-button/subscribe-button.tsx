import clsx from 'clsx';
import { AppRoutes } from 'common/enums/enums';
import { Button } from 'components/common/common';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  isCurrentUserSubscribed: boolean;
  onSubscribeClick: () => void;
  hasUser: boolean;
  isDisabled: boolean;
};

const SubscribeButton: FC<Props> = ({ className, isCurrentUserSubscribed, onSubscribeClick, hasUser, isDisabled }) => {
  const navigate = useNavigate();
  const handleSubscribeClick = (): void => {
    if (!hasUser) {
      navigate(AppRoutes.SIGN_IN);
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
