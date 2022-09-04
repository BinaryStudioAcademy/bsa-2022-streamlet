import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const LiveIndicator: FC<Props> = ({ className }) => {
  return (
    <span className={clsx(styles['indicator'], className)}>
      <div className={styles['live-label']}>Live</div>
    </span>
  );
};

export { LiveIndicator };
