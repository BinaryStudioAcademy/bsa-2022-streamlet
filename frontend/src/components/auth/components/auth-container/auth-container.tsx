import styles from './styles.module.scss';
import { FC } from 'common/types/types';
import React, { ReactNode } from 'react';
import logo from 'assets/img/logo.svg';
import zigzag from 'assets/img/auth/auth-zigzag.svg';
import element from 'assets/img/auth/auth-element.svg';
import clsx from 'clsx';

type Props = {
  pageTitle: 'Sign in' | 'Sign up' | 'Restore password' | 'Account Verification';
  topLevelErrorComponent?: ReactNode | undefined;
  children: React.ReactNode;
  className?: string;
};

const AuthContainer: FC<Props> = ({ children, pageTitle, className, topLevelErrorComponent }) => {
  return (
    <div className={clsx(styles['auth-background'], className)}>
      <img src={zigzag} className={styles['background-zigzag']} alt="zigzag" />
      <img src={zigzag} className={styles['background-zigzag-2']} alt="zigzag" />
      <img src={element} className={styles['background-element']} alt="element" />
      <div className={styles['auth-modal']}>
        <div className={styles['auth-container']}>
          <img src={logo} className={styles['auth-logo']} alt="logo" />
          <h1 className={styles['auth-title']}>{pageTitle}</h1>
          {topLevelErrorComponent}
          {children}
        </div>
      </div>
    </div>
  );
};

export { AuthContainer };
