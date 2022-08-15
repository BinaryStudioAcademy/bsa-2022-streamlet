import React, { FC } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  hCentered?: boolean;
  vCentered?: boolean;
  className?: string;
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const Loader: FC<Props> = ({ hCentered = true, vCentered = true, className, spinnerSize = 'md' }) => {
  return (
    <div
      className={clsx(styles['loader-wrapper'], className, {
        [styles['h-centered']]: hCentered,
        [styles['v-centered']]: vCentered,
      })}
    >
      <span className={clsx(styles['loader'], styles[spinnerSize])}></span>
    </div>
  );
};

export { Loader };
