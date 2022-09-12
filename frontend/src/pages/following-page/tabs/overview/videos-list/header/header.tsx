import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  title: string;
  className?: string;
};

const Header: FC<Props> = ({ title, className }) => {
  return (
    <div className={clsx(styles['header-wrapper'], className)}>
      <h2 className={styles['header']}>{title}</h2>
      <div className={clsx(styles['line-segment'], styles['right'])} />
    </div>
  );
};

export { Header };
