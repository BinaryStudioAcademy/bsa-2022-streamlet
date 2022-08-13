import React, { FC } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

type Props = {
  centered?: boolean;
  className?: string;
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const Loader: FC<Props> = ({ centered = true, className, spinnerSize = 'md' }) => {
  return (
    <div className={classNames(styles['loader-wrapper'], className, { [styles['centered']]: centered })}>
      <span className={classNames(styles['loader'], styles[spinnerSize])}></span>
    </div>
  );
};

export { Loader };
