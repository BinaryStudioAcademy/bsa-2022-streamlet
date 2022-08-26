import clsx from 'clsx';
import { Button } from 'components/common/common';
import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  name: string;
  onClick: () => void;
  isActive: boolean;
  className?: string;
};

const ChannelTab: FC<Props> = ({ name, className, onClick, isActive }) => {
  return (
    <Button
      className={clsx(styles['channel-button'], className, { [styles['active']]: isActive })}
      content={name}
      onClick={onClick}
    />
  );
};

export { ChannelTab };
