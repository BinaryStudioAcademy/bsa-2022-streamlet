import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const LiveIndicator: FC<Props> = ({ className }) => {
  return (
    <span className={clsx(styles['indicator'], className)}>
      <div className={clsx(styles['circle'], styles['blink'])} aria-hidden="true"></div>Live
    </span>
  );
};

export { LiveIndicator };
